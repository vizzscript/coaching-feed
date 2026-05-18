'use client';

import { motion } from 'framer-motion';

export const LiveBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded-md"
    >
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-rose-500"
      />
      <span className="text-[10px] font-bold text-rose-500 tracking-wider uppercase">New</span>
    </motion.div>
  );
};
