'use client';

import { ConnectionStatus } from '../states/ConnectionStatus';
import { usePathname } from 'next/navigation';

export const TopBar = () => {
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 sm:absolute flex justify-center pointer-events-none">
      <div className="w-full max-w-[600px] flex justify-between items-center h-20 px-6 bg-gradient-to-b from-[#09090b] to-transparent pointer-events-auto">
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
          {pathname === '/admin' ? 'Studio' : 'Live Feed'}
        </h1>
        <ConnectionStatus />
      </div>
    </header>
  );
};
