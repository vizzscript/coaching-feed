import { formatDistanceToNow } from 'date-fns';
import { Feed } from '../lib/api';

interface FeedCardProps {
  feed: Feed;
}

export const FeedCard = ({ feed }: FeedCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{feed.title}</h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
          {formatDistanceToNow(new Date(feed.createdAt), { addSuffix: true })}
        </span>
      </div>
      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
        {feed.description}
      </p>
    </div>
  );
};
