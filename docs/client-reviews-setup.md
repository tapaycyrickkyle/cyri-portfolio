# Client reviews setup

The client-review feature is source-ready but requires one owner-authorized Supabase setup before it can authenticate admins or accept submissions.

## 1. Run the migration in Supabase

Open the Supabase SQL Editor for the project connected to this portfolio and run:

`supabase/migrations/20261016000000_client_reviews.sql`

The migration creates the review tables, row-level security policies, server-side token validation functions, atomic single-use submission logic, and database-backed rate limiting. It is safe to keep as a tracked migration file. This project does not execute it automatically.

## 2. Create the private admin account

Create the administrator in Supabase Auth using the dashboard. Public signups should be disabled for this project.

After the Auth user exists, run this owner-authorized SQL statement in the SQL Editor, replacing the email with the intended admin account:

```sql
insert into public.review_admins (user_id)
select id
from auth.users
where lower(email) = lower('admin@example.com')
on conflict (user_id) do nothing;
```

Only users present in `public.review_admins` can use the private admin routes.

## 3. Configure Vercel environment variables

Set these variables for the deployment and local development environment:

```text
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
REVIEW_RATE_LIMIT_SECRET=your-long-random-server-secret
```

The rate-limit secret is server-only. Do not use a service-role key in the browser or commit any real secret to the repository. Redeploy after changing deployment environment variables.

## 4. Verify the workflow

1. Sign in at `/admin/login` with the allowlisted Auth user.
2. Create an invitation and copy the private link immediately; the raw token is not shown again in the history list.
3. Open the link in a private browser window and submit feedback.
4. Confirm the submission appears as `pending` in `/admin/reviews`.
5. Publish it and confirm it appears on the home page after cache revalidation.
6. Revoke an unused invitation and confirm its review link becomes unavailable.
7. Confirm an already-used invitation cannot submit a second review.

The public home page displays only reviews with the `published` status. No review or aggregate-rating structured data is emitted.
