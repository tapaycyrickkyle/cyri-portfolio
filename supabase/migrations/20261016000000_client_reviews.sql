begin;

create extension if not exists pgcrypto;

create table if not exists public.review_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.review_invitations (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (char_length(btrim(client_name)) between 1 and 160),
  client_email text check (client_email is null or char_length(client_email) <= 320),
  project_name text not null check (char_length(btrim(project_name)) between 1 and 160),
  internal_notes text check (internal_notes is null or char_length(internal_notes) <= 2_000),
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz not null,
  used_at timestamptz,
  revoked_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.client_reviews (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null unique references public.review_invitations (id) on delete cascade,
  client_name text not null check (char_length(btrim(client_name)) between 1 and 160),
  project_name text not null check (char_length(btrim(project_name)) between 1 and 160),
  rating integer not null check (rating between 1 and 5),
  review_text text not null check (char_length(btrim(review_text)) between 20 and 5_000),
  display_name_consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  verified_client boolean not null default false,
  moderation_reason text check (moderation_reason is null or char_length(moderation_reason) <= 2_000),
  submitted_at timestamptz not null default timezone('utc', now()),
  published_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now()),
  check (status <> 'published' or published_at is not null)
);

create table if not exists public.review_rate_limits (
  scope text not null,
  bucket_key text not null,
  window_started_at timestamptz not null,
  request_count integer not null check (request_count >= 0),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (scope, bucket_key)
);

create index if not exists review_invitations_expires_at_idx
  on public.review_invitations (expires_at);

create index if not exists review_invitations_created_at_idx
  on public.review_invitations (created_at desc);

create index if not exists client_reviews_status_submitted_at_idx
  on public.client_reviews (status, submitted_at desc);

create index if not exists review_rate_limits_updated_at_idx
  on public.review_rate_limits (updated_at);

create or replace function public.is_review_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.review_admins
    where user_id = (select auth.uid())
  );
$$;

create or replace function public.get_review_dashboard_summary()
returns table (
  total_submitted bigint,
  pending_reviews bigint,
  published_reviews bigint,
  rejected_reviews bigint,
  active_invitations bigint,
  used_invitations bigint,
  expired_invitations bigint,
  revoked_invitations bigint
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.is_review_admin() then
    raise exception 'NOT_AUTHORIZED' using errcode = '42501';
  end if;

  return query
  select
    (select count(*) from public.client_reviews),
    (select count(*) from public.client_reviews where status = 'pending'),
    (select count(*) from public.client_reviews where status = 'published'),
    (select count(*) from public.client_reviews where status = 'rejected'),
    (select count(*) from public.review_invitations
      where used_at is null and revoked_at is null and expires_at > now()),
    (select count(*) from public.review_invitations where used_at is not null),
    (select count(*) from public.review_invitations
      where used_at is null and revoked_at is null and expires_at <= now()),
    (select count(*) from public.review_invitations where revoked_at is not null);
end;
$$;

create or replace function public.get_review_invitation_context(p_token_hash text)
returns table (
  client_name text,
  project_name text
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select i.client_name, i.project_name
  from public.review_invitations as i
  where i.token_hash = lower(p_token_hash)
    and i.used_at is null
    and i.revoked_at is null
    and i.expires_at > now()
    and p_token_hash ~ '^[0-9a-f]{64}$';
$$;

create or replace function public.submit_client_review(
  p_token_hash text,
  p_rating integer,
  p_review_text text,
  p_display_name_consent boolean
)
returns uuid
language plpgsql
volatile
security definer
set search_path = public, pg_temp
as $$
declare
  invitation_row public.review_invitations%rowtype;
  review_id uuid;
begin
  if p_token_hash is null
     or p_token_hash !~ '^[0-9a-f]{64}$'
     or p_rating is null
     or p_rating not between 1 and 5
     or p_review_text is null
     or char_length(btrim(p_review_text)) not between 20 and 5_000 then
    raise exception 'INVALID_INVITATION' using errcode = 'P0001';
  end if;

  select *
  into invitation_row
  from public.review_invitations
  where token_hash = lower(p_token_hash)
  for update;

  if not found
     or invitation_row.used_at is not null
     or invitation_row.revoked_at is not null
     or invitation_row.expires_at <= now() then
    raise exception 'INVALID_INVITATION' using errcode = 'P0001';
  end if;

  insert into public.client_reviews (
    invitation_id,
    client_name,
    project_name,
    rating,
    review_text,
    display_name_consent,
    status,
    verified_client,
    submitted_at,
    updated_at
  )
  values (
    invitation_row.id,
    btrim(invitation_row.client_name),
    btrim(invitation_row.project_name),
    p_rating,
    btrim(p_review_text),
    coalesce(p_display_name_consent, false),
    'pending',
    false,
    timezone('utc', now()),
    timezone('utc', now())
  )
  returning id into review_id;

  update public.review_invitations
  set used_at = timezone('utc', now())
  where id = invitation_row.id
    and used_at is null;

  if not found then
    raise exception 'INVALID_INVITATION' using errcode = 'P0001';
  end if;

  return review_id;
end;
$$;

create or replace function public.regenerate_review_invitation(
  p_invitation_id uuid,
  p_token_hash text,
  p_expires_at timestamptz
)
returns uuid
language plpgsql
volatile
security definer
set search_path = public, pg_temp
as $$
declare
  old_invitation public.review_invitations%rowtype;
  new_invitation_id uuid;
begin
  if not public.is_review_admin() then
    raise exception 'NOT_AUTHORIZED' using errcode = '42501';
  end if;

  if p_token_hash is null
     or p_token_hash !~ '^[0-9a-f]{64}$'
     or p_expires_at <= now() then
    raise exception 'INVALID_INVITATION' using errcode = 'P0001';
  end if;

  select *
  into old_invitation
  from public.review_invitations
  where id = p_invitation_id
  for update;

  if not found or old_invitation.used_at is not null then
    raise exception 'INVALID_INVITATION' using errcode = 'P0001';
  end if;

  update public.review_invitations
  set revoked_at = coalesce(revoked_at, timezone('utc', now()))
  where id = old_invitation.id;

  insert into public.review_invitations (
    client_name,
    client_email,
    project_name,
    internal_notes,
    token_hash,
    expires_at,
    created_by
  )
  values (
    old_invitation.client_name,
    old_invitation.client_email,
    old_invitation.project_name,
    old_invitation.internal_notes,
    lower(p_token_hash),
    p_expires_at,
    (select auth.uid())
  )
  returning id into new_invitation_id;

  return new_invitation_id;
end;
$$;

create or replace function public.get_published_client_reviews()
returns table (
  id uuid,
  client_name text,
  project_name text,
  rating integer,
  review_text text,
  verified_client boolean,
  published_at timestamptz
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select
    r.id,
    case when r.display_name_consent then nullif(btrim(r.client_name), '') else null end,
    r.project_name,
    r.rating,
    r.review_text,
    r.verified_client,
    r.published_at
  from public.client_reviews as r
  where r.status = 'published'
  order by r.published_at desc nulls last, r.submitted_at desc;
$$;

create or replace function public.consume_review_rate_limit(
  p_scope text,
  p_bucket_key text
)
returns boolean
language plpgsql
volatile
security definer
set search_path = public, pg_temp
as $$
declare
  allowed boolean;
  request_limit integer;
  window_seconds integer;
begin
  if p_scope = 'admin-login' then
    request_limit := 8;
    window_seconds := 900;
  elsif p_scope = 'review-validation' then
    request_limit := 60;
    window_seconds := 900;
  elsif p_scope = 'review-submit' then
    request_limit := 12;
    window_seconds := 900;
  else
    return false;
  end if;

  if p_bucket_key is null or p_bucket_key !~ '^[0-9a-f]{64}$' then
    return false;
  end if;

  insert into public.review_rate_limits (
    scope,
    bucket_key,
    window_started_at,
    request_count,
    updated_at
  )
  values (
    p_scope,
    p_bucket_key,
    timezone('utc', now()),
    1,
    timezone('utc', now())
  )
  on conflict (scope, bucket_key) do update
  set
    window_started_at = case
      when public.review_rate_limits.window_started_at
        + make_interval(secs => window_seconds) <= timezone('utc', now())
        then timezone('utc', now())
      else public.review_rate_limits.window_started_at
    end,
    request_count = case
      when public.review_rate_limits.window_started_at
        + make_interval(secs => window_seconds) <= timezone('utc', now())
        then 1
      else public.review_rate_limits.request_count + 1
    end,
    updated_at = timezone('utc', now())
  returning request_count <= request_limit into allowed;

  return coalesce(allowed, false);
end;
$$;

alter table public.review_admins enable row level security;
alter table public.review_invitations enable row level security;
alter table public.client_reviews enable row level security;
alter table public.review_rate_limits enable row level security;

drop policy if exists "review admins can read their own allowlist row" on public.review_admins;
create policy "review admins can read their own allowlist row"
  on public.review_admins
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "authorized admins manage invitations" on public.review_invitations;
create policy "authorized admins manage invitations"
  on public.review_invitations
  for all
  to authenticated
  using (public.is_review_admin())
  with check (public.is_review_admin() and created_by = (select auth.uid()));

drop policy if exists "authorized admins manage reviews" on public.client_reviews;
create policy "authorized admins manage reviews"
  on public.client_reviews
  for all
  to authenticated
  using (public.is_review_admin())
  with check (public.is_review_admin());

revoke all on table public.review_admins from anon, authenticated;
grant select on table public.review_admins to authenticated;

revoke all on table public.review_invitations from anon, authenticated;
grant select, insert, update, delete on table public.review_invitations to authenticated;

revoke all on table public.client_reviews from anon, authenticated;
grant select, insert, update, delete on table public.client_reviews to authenticated;

revoke all on table public.review_rate_limits from anon, authenticated;

revoke all on function public.is_review_admin() from public;
revoke all on function public.get_review_dashboard_summary() from public;
revoke all on function public.get_review_invitation_context(text) from public;
revoke all on function public.submit_client_review(text, integer, text, boolean) from public;
revoke all on function public.regenerate_review_invitation(uuid, text, timestamptz) from public;
revoke all on function public.get_published_client_reviews() from public;
revoke all on function public.consume_review_rate_limit(text, text) from public;

grant execute on function public.is_review_admin() to authenticated;
grant execute on function public.get_review_dashboard_summary() to authenticated;
grant execute on function public.get_review_invitation_context(text) to anon, authenticated;
grant execute on function public.submit_client_review(text, integer, text, boolean) to anon, authenticated;
grant execute on function public.regenerate_review_invitation(uuid, text, timestamptz) to authenticated;
grant execute on function public.get_published_client_reviews() to anon, authenticated;
grant execute on function public.consume_review_rate_limit(text, text) to anon, authenticated;

commit;
