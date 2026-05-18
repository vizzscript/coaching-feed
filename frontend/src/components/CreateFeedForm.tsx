'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createFeed } from '@/lib/api';
import { AnimatedTextarea } from './ui/AnimatedTextarea';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CreateFeedForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = title.trim().length > 0 && description.trim().length > 0;
  const MAX_DESC = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    try {
      setLoading(true);
      setError(null);
      await createFeed(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to publish. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title Input */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 focus-within:border-zinc-600 transition-colors">
        <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's the coaching update?"
          maxLength={100}
          className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none text-base font-medium"
          required
        />
        <div className="flex justify-end mt-2">
          <span className="text-xs text-zinc-600">{title.length}/100</span>
        </div>
      </div>

      {/* Description Textarea */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 focus-within:border-zinc-600 transition-colors">
        <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
          Details
        </label>
        <AnimatedTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Share your coaching insight, tip, or update..."
          maxLength={MAX_DESC}
        />
        <div className="flex justify-end mt-2">
          <span className={cn("text-xs", description.length > MAX_DESC * 0.9 ? "text-amber-500" : "text-zinc-600")}>
            {description.length}/{MAX_DESC}
          </span>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-rose-400 px-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!isValid || loading}
        whileHover={{ scale: isValid ? 1.01 : 1 }}
        whileTap={{ scale: isValid ? 0.98 : 1 }}
        className={cn(
          "w-full py-3.5 px-5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300",
          isValid && !loading
            ? "bg-zinc-100 text-zinc-950 hover:bg-white"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        )}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
            </motion.span>
          ) : success ? (
            <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> Published!
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Publish to Feed
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};
