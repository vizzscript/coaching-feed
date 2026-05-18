'use client';

import { ReactNode, useState, useEffect } from 'react';
import { MobileBottomNav } from './MobileBottomNav';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const [leftWidth, setLeftWidth] = useState(260);
  const [rightWidth, setRightWidth] = useState(320);
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const leftSavedWidth = localStorage.getItem('sidebar-left-width');
      const rightSavedWidth = localStorage.getItem('sidebar-right-width');
      const leftSavedOpen = localStorage.getItem('sidebar-left-open');
      const rightSavedOpen = localStorage.getItem('sidebar-right-open');

      if (leftSavedWidth) setLeftWidth(Number(leftSavedWidth));
      if (rightSavedWidth) setRightWidth(Number(rightSavedWidth));
      if (leftSavedOpen !== null) setIsLeftOpen(leftSavedOpen === 'true');
      if (rightSavedOpen !== null) setIsRightOpen(rightSavedOpen === 'true');
    }
  }, []);

  const handleLeftMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = moveEvent.clientX;
      if (newWidth > 180 && newWidth < 400) {
        setLeftWidth(newWidth);
        localStorage.setItem('sidebar-left-width', String(newWidth));
      } else if (newWidth <= 150) {
        setIsLeftOpen(false);
        localStorage.setItem('sidebar-left-open', 'false');
        cleanup();
      }
    };
    
    const cleanup = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', cleanup);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', cleanup);
  };

  const handleRightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = window.innerWidth - moveEvent.clientX;
      if (newWidth > 240 && newWidth < 450) {
        setRightWidth(newWidth);
        localStorage.setItem('sidebar-right-width', String(newWidth));
      } else if (newWidth <= 200) {
        setIsRightOpen(false);
        localStorage.setItem('sidebar-right-open', 'false');
        cleanup();
      }
    };
    
    const cleanup = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', cleanup);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', cleanup);
  };

  // Prevent SSR/CSR layout hydration mismatch by rendering default or full layout after mounting
  const dynamicWrapperStyle = mounted ? {
    display: 'flex',
    flexDirection: 'row' as const,
    width: '100%',
    minHeight: '100dvh',
  } : undefined;

  return (
    <div className="min-h-[100dvh] bg-[#09090b] text-zinc-50 font-sans selection:bg-zinc-800 flex justify-center relative overflow-x-hidden">
      {/* Responsive layout wrapper */}
      <div 
        style={dynamicWrapperStyle} 
        className="w-full min-h-[100dvh] flex flex-col md:flex-row justify-center relative"
      >
        {/* Left Sidebar */}
        <Sidebar 
          isOpen={isLeftOpen} 
          width={leftWidth} 
          onClose={() => {
            setIsLeftOpen(false);
            localStorage.setItem('sidebar-left-open', 'false');
          }} 
        />

        {/* Left Drag Handle */}
        {mounted && isLeftOpen && (
          <div 
            onMouseDown={handleLeftMouseDown}
            style={{ left: `${leftWidth}px` }}
            className="hidden md:block absolute top-0 bottom-0 w-1 hover:w-1.5 bg-transparent hover:bg-zinc-800/80 cursor-col-resize z-50 transition-colors select-none"
          />
        )}

        {/* Floating Expand Sidebar Button */}
        {mounted && !isLeftOpen && (
          <button
            onClick={() => {
              setIsLeftOpen(true);
              localStorage.setItem('sidebar-left-open', 'true');
            }}
            className="hidden md:flex absolute top-5 left-5 z-40 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-900 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer"
            title="Open Navigation"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}

        {/* Central Feed / Studio Core Column */}
        <div 
          className="flex-1 min-h-[100dvh] flex flex-col relative border-zinc-900/50 md:border-x bg-black/5 max-w-full md:max-w-[680px]"
        >
          <TopBar />
          
          {/* Main Content Area */}
          <main className="flex-1 px-4 sm:px-6 pt-24 pb-28 md:pt-12 md:pb-12">
            {children}
          </main>
          
          <MobileBottomNav />
        </div>

        {/* Floating Expand Right Panel Button */}
        {mounted && !isRightOpen && (
          <button
            onClick={() => {
              setIsRightOpen(true);
              localStorage.setItem('sidebar-right-open', 'true');
            }}
            className="hidden xl:flex absolute top-5 right-5 z-40 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-900 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer"
            title="Open Info Panel"
          >
            <PanelRightOpen className="w-4 h-4" />
          </button>
        )}

        {/* Right Drag Handle */}
        {mounted && isRightOpen && (
          <div 
            onMouseDown={handleRightMouseDown}
            style={{ right: `${rightWidth}px` }}
            className="hidden xl:block absolute top-0 bottom-0 w-1 hover:w-1.5 bg-transparent hover:bg-zinc-800/80 cursor-col-resize z-50 transition-colors select-none"
          />
        )}

        {/* Right Info / Analytics Panel */}
        <RightPanel 
          isOpen={isRightOpen} 
          width={rightWidth} 
          onClose={() => {
            setIsRightOpen(false);
            localStorage.setItem('sidebar-right-open', 'false');
          }} 
        />
      </div>
    </div>
  );
};
