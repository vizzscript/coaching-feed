'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Feed } from '@/lib/api';
import { LiveBadge } from './LiveBadge';
import { memo } from 'react';

interface FeedCardProps {
  feed: Feed;
  isNew?: boolean;
}

export const FeedCard = memo(({ feed, isNew = false }: FeedCardProps) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all duration-300 p-5 gap-3 flex flex-col"
    >
      {/* Glow effect on hover for realtime cards */}
      {isNew && (
        <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 pointer-events-none" />
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-zinc-100 font-semibold text-base leading-snug flex-1">
          {feed.title}
        </h3>
        {isNew && <LiveBadge />}
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
        {feed.description}
      </p>

      <p className="text-zinc-600 text-xs mt-1">
        {formatDistanceToNow(new Date(feed.createdAt), { addSuffix: true })}
      </p>
    </motion.article>
  );
});

FeedCard.displayName = 'FeedCard';
