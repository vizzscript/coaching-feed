'use client';

import { usePathname } from 'next/navigation';
import { ShieldCheck, Zap, Sparkles, BarChart2, CheckCircle2, Clock, PanelRightClose } from 'lucide-react';
import { motion } from 'framer-motion';

interface RightPanelProps {
  isOpen: boolean;
  width: number;
  onClose: () => void;
}

export const RightPanel = ({ isOpen, width, onClose }: RightPanelProps) => {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin';

  if (!isOpen) return null;

  return (
    <aside 
      style={{ width: `${width}px` }}
      className="hidden xl:flex flex-col h-screen sticky top-0 border-l border-zinc-900 bg-zinc-950/20 backdrop-blur-md px-6 py-8 gap-6 overflow-y-auto overflow-x-hidden select-none shrink-0 relative"
    >
      {/* Header and Toggle */}
      <div className="flex items-center justify-between w-full min-w-[200px] border-b border-zinc-900/80 pb-4 shrink-0">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Studio Guide
        </span>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 transition-all duration-300 cursor-pointer shrink-0"
          title="Collapse Info Panel"
        >
          <PanelRightClose className="w-4 h-4" />
        </button>
      </div>

      {/* Overview Stats */}
      <div className="flex flex-col gap-4 w-full min-w-[200px] shrink-0">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-1">
          Live System Stats
        </h4>
        
        <div className="grid grid-cols-1 gap-2.5 w-full">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-zinc-400 font-medium truncate">Socket Connection</span>
              <span className="text-[10px] text-zinc-600 truncate">Reconnection delay: 1000ms</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-zinc-400 font-medium truncate">Uptime Status</span>
              <span className="text-[10px] text-emerald-500/90 font-medium truncate">100% Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Guideline / Context Panel */}
      <div className="flex flex-col gap-4 flex-1 w-full min-w-[200px]">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-1">
          {isAdmin ? 'Studio Assistant' : 'Feed Assistant'}
        </h4>

        {isAdmin ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900/60 w-full"
          >
            <div className="flex items-center gap-2 text-indigo-400 shrink-0">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Publishing Rules</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Studio broadcasts coaching insights to all connected devices. Use these parameters to write rich updates:
            </p>
            <ul className="flex flex-col gap-2.5 mt-1">
              <li className="flex gap-2.5 items-start text-[11px] text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 mt-0.5 shrink-0" />
                <span>Keep titles ultra-concise and readable in under 2s.</span>
              </li>
              <li className="flex gap-2.5 items-start text-[11px] text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 mt-0.5 shrink-0" />
                <span>Provide actionable advice to ensure high user value.</span>
              </li>
            </ul>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900/60 w-full"
          >
            <div className="flex items-center gap-2 text-emerald-400 shrink-0">
              <BarChart2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">About Coaching Feed</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              This dashboard monitors live coaching activities using real-time WebSockets.
            </p>
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex gap-2.5 items-start text-[11px] text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 animate-ping" />
                <span>Updates are automatically pulled without manual reloads.</span>
              </div>
              <div className="flex gap-2.5 items-start text-[11px] text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                <span>Fresh updates are marked with a green pulse glow.</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Activity Log (Simulated Live Action) */}
      <div className="flex flex-col gap-3 w-full min-w-[200px] shrink-0 mt-auto">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-600" />
          Event Logs
        </h4>
        <div className="flex flex-col gap-2 bg-zinc-900/10 border border-zinc-900/50 p-4 rounded-2xl text-[10px] font-mono text-zinc-500 w-full">
          <div className="flex justify-between w-full">
            <span>[info] websocket init</span>
            <span className="text-emerald-500">ok</span>
          </div>
          <div className="flex justify-between w-full">
            <span>[info] joined active_feed</span>
            <span className="text-emerald-500">ok</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
