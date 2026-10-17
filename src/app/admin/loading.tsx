const skeletonClass = "animate-pulse motion-reduce:animate-none bg-surface-strong";

export default function AdminLoading() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading admin workspace...</span>

      <div className="h-0.5 w-full overflow-hidden bg-surface-strong" aria-hidden="true">
        <div className="admin-loading-progress h-full w-1/3 bg-foreground" />
      </div>

      <header className="border-b border-outline bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className={`${skeletonClass} h-4 w-48`} />
            <div className="flex items-center gap-3">
              <div className={`${skeletonClass} h-3 w-36`} />
              <div className={`${skeletonClass} h-9 w-24`} />
            </div>
          </div>

          <nav aria-label="Loading admin navigation" className="flex flex-wrap gap-2">
            <div className={`${skeletonClass} h-10 w-28`} />
            <div className={`${skeletonClass} h-10 w-40`} />
            <div className={`${skeletonClass} h-10 w-32`} />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="space-y-8">
          <section className="flex flex-col justify-between gap-4 border-b border-outline pb-6 sm:flex-row sm:items-end">
            <div className="w-full max-w-2xl space-y-3">
              <div className={`${skeletonClass} h-3 w-28`} />
              <div className={`${skeletonClass} h-10 w-72 max-w-full`} />
              <div className={`${skeletonClass} h-4 w-full`} />
              <div className={`${skeletonClass} h-4 w-5/6`} />
            </div>
            <div className={`${skeletonClass} h-10 w-32`} />
          </section>

          <section className="space-y-4" aria-label="Loading dashboard metrics">
            <div className="flex items-center justify-between gap-4">
              <div className={`${skeletonClass} h-6 w-40`} />
              <div className={`${skeletonClass} h-3 w-28`} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="border border-outline bg-surface p-4">
                  <div className={`${skeletonClass} h-3 w-28`} />
                  <div className={`${skeletonClass} mt-3 h-9 w-16`} />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4" aria-label="Loading admin actions">
            <div className={`${skeletonClass} h-6 w-44`} />
            <div className="grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="border border-outline bg-surface p-5">
                  <div className={`${skeletonClass} h-5 w-5`} />
                  <div className={`${skeletonClass} mt-5 h-5 w-40`} />
                  <div className={`${skeletonClass} mt-3 h-4 w-full`} />
                  <div className={`${skeletonClass} mt-2 h-4 w-4/5`} />
                  <div className={`${skeletonClass} mt-5 h-3 w-16`} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
