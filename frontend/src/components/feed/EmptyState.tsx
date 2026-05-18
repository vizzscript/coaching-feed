'use client';

import { motion } from 'framer-motion';
import { Rss } from 'lucide-react';

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-24 gap-5"
    >
      <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
        <Rss className="w-7 h-7 text-zinc-500" />
      </div>
      <div>
        <h3 className="text-zinc-200 font-semibold text-lg">No feeds yet</h3>
        <p className="text-zinc-500 text-sm mt-1 max-w-xs">
          New coaching updates will appear here in realtime.
        </p>
      </div>
    </motion.div>
  );
};
