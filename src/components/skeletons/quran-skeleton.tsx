export function QuranSkeleton() {
  return (
    <main className="space-y-2">
      <HeaderSkeleton />
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <VerseSkeleton key={i} />
        ))}
      </div>
    </main>
  );

  function HeaderSkeleton() {
    return (
      <div className="animate-pulse space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 rounded bg-muted"></div>
            <div className="h-6 w-20 rounded bg-muted"></div>
          </div>
          <div className="h-8 w-8 rounded bg-muted"></div>
        </div>
        <hr />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <section className="space-y-2">
            <div className="h-4 w-16 rounded bg-muted"></div>
            <div className="h-6 w-48 rounded bg-muted"></div>
          </section>
          <section className="hidden space-y-2 md:block">
            <div className="h-4 w-32 rounded bg-muted"></div>
            <div className="h-6 w-40 rounded bg-muted"></div>
          </section>
        </div>
      </div>
    );
  }

  function VerseSkeleton() {
    return (
      <div className="animate-pulse space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 rounded bg-muted"></div>
          <div className="h-4 w-12 rounded bg-muted"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-muted"></div>
          <div className="h-4 w-5/6 rounded bg-muted"></div>
          <div className="h-4 w-4/5 rounded bg-muted"></div>
        </div>
        <div className="h-8 w-3/4 rounded bg-muted"></div>
      </div>
    );
  }
}
