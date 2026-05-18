'use client';

export const FeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-36 bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-4 w-16 bg-zinc-800 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-3 w-4/5 bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-3 w-2/3 bg-zinc-800 rounded-lg animate-pulse" />
          </div>
          <div className="h-3 w-20 bg-zinc-800 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
};
