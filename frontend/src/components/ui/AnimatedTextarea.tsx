'use client';

import { useRef, useEffect, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const AnimatedTextarea = ({ className, ...props }: AnimatedTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resize = () => {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };

    el.addEventListener('input', resize);
    resize(); // run once on mount
    return () => el.removeEventListener('input', resize);
  }, []);

  return (
    <textarea
      ref={ref}
      rows={3}
      className={cn(
        'w-full resize-none bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none text-sm leading-relaxed min-h-[80px]',
        className
      )}
      {...props}
    />
  );
};
