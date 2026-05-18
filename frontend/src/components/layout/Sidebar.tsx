'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Radio, PlusSquare, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ConnectionStatus } from '../states/ConnectionStatus';

interface SidebarProps {
  isOpen: boolean;
  width: number;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, width, onClose }: SidebarProps) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <aside 
      style={{ width: `${width}px` }}
      className="hidden md:flex flex-col h-screen sticky top-0 border-r border-zinc-900 bg-zinc-950/20 backdrop-blur-md px-4 py-8 justify-between select-none shrink-0 overflow-hidden relative"
    >
      <div className="flex flex-col gap-8 w-full min-w-[180px]">
        {/* Logo/Branding & Collapse Toggle */}
        <div className="flex items-center justify-between px-1">
          <Link href="/" className="flex items-center gap-3 py-1 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-300">
              <Radio className="w-5 h-5 text-zinc-100 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                Coaching Live
              </span>
              <span className="text-[10px] text-zinc-500 font-medium tracking-wide uppercase">
                Control Panel
              </span>
            </div>
          </Link>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 transition-all duration-300 cursor-pointer shrink-0"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium",
                  isActive 
                    ? "text-zinc-50" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/40"
                )}
              >
                {/* Visual active indicator pill on the left */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon 
                  className={cn(
                    "w-5 h-5 transition-transform duration-300 group-hover:scale-105 shrink-0",
                    isActive ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-300"
                  )} 
                />

                <div className="flex flex-col overflow-hidden">
                  <span className="truncate">{item.name}</span>
                  <span className={cn(
                    "text-[10px] font-normal transition-colors duration-300 truncate",
                    isActive ? "text-zinc-400" : "text-zinc-600 group-hover:text-zinc-500"
                  )}>
                    {item.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Status Area */}
      <div className="flex flex-col gap-4 px-3 pt-4 border-t border-zinc-900/50 w-full min-w-[180px]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-medium">Status</span>
          <ConnectionStatus />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-400 shrink-0">
            C
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-semibold text-zinc-300 leading-none truncate">Coach Console</span>
            <span className="text-[10px] text-zinc-500 mt-0.5 truncate">Admin Workspace</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const navItems = [
  { name: 'Live Feed', href: '/', icon: Home, description: 'View real-time updates' },
  { name: 'Studio', href: '/admin', icon: PlusSquare, description: 'Publish new insights' },
];
