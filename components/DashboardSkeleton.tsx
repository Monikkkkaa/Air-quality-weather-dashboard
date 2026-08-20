import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading dashboard">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-3 h-3 w-56" />
          <Skeleton className="mt-8 h-16 w-40" />
          <div className="mt-8 grid grid-cols-4 gap-4 border-t border-white/10 pt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:w-80">
          <Skeleton className="h-40 w-40 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>

      <Skeleton className="h-32" />
    </div>
  );
}
