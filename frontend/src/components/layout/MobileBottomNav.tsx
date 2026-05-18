'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Feed', href: '/', icon: Home },
    { name: 'Studio', href: '/admin', icon: PlusSquare },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900" />
      
      <nav className="relative flex justify-around items-center h-20 pb-4 px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-12 tap-highlight-transparent"
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  isActive ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-300"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-[10px] mt-1 font-medium transition-colors duration-300",
                isActive ? "text-zinc-50" : "text-zinc-500"
              )}>
                {item.name}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-3 w-1 h-1 bg-zinc-50 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
