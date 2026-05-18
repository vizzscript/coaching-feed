'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useFeeds } from '@/hooks/useFeeds';
import { FeedCard } from './feed/FeedCard';
import { FeedSkeleton } from './feed/FeedSkeleton';
import { EmptyState } from './feed/EmptyState';

export const FeedList = () => {
  const { feeds, newFeedIds, loading, error } = useFeeds();

  if (loading) return <FeedSkeleton />;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20 text-sm"
      >
        {error}
      </motion.div>
    );
  }

  if (feeds.length === 0) return <EmptyState />;

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.06 } },
        hidden: {},
      }}
    >
      <AnimatePresence initial={false}>
        {feeds.map((feed) => (
          <FeedCard
            key={feed._id}
            feed={feed}
            isNew={newFeedIds.has(feed._id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
