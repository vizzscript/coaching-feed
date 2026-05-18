'use client';

import { ReactNode } from 'react';
import { MobileBottomNav } from './MobileBottomNav';
import { TopBar } from './TopBar';

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[100dvh] bg-[#09090b] text-zinc-50 font-sans selection:bg-zinc-800 flex justify-center">
      {/* Central responsive column for desktop / full width on mobile */}
      <div className="w-full max-w-[600px] min-h-[100dvh] relative flex flex-col sm:border-x sm:border-zinc-800/50 sm:shadow-2xl sm:bg-black/20">
        <TopBar />
        
        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 pt-24 pb-28 sm:pb-12">
          {children}
        </main>
        
        <MobileBottomNav />
      </div>
    </div>
  );
};
