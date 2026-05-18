'use client';

import { useFeeds } from '../hooks/useFeeds';
import { FeedCard } from './FeedCard';

export const FeedList = () => {
  const { feeds, loading, error } = useFeeds();

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        {error}
      </div>
    );
  }

  if (feeds.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <p>No feeds available yet. Waiting for updates...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {feeds.map((feed) => (
        <FeedCard key={feed._id} feed={feed} />
      ))}
    </div>
  );
};
