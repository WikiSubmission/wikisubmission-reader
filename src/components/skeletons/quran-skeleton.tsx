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
      <div className="space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 bg-muted rounded"></div>
            <div className="h-6 w-20 bg-muted rounded"></div>
          </div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
        <hr />
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <section className="space-y-2">
            <div className="h-4 w-16 bg-muted rounded"></div>
            <div className="h-6 w-48 bg-muted rounded"></div>
          </section>
          <section className="space-y-2 hidden md:block">
            <div className="h-4 w-32 bg-muted rounded"></div>
            <div className="h-6 w-40 bg-muted rounded"></div>
          </section>
        </div>
      </div>
    );
  }

  function VerseSkeleton() {
    return (
      <div className="space-y-4 p-4 border rounded-lg animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 bg-muted rounded"></div>
          <div className="h-4 w-12 bg-muted rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-5/6 bg-muted rounded"></div>
          <div className="h-4 w-4/5 bg-muted rounded"></div>
        </div>
        <div className="h-8 w-3/4 bg-muted rounded"></div>
      </div>
    );
  }
}
