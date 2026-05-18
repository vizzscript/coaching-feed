'use client';

import { useSocket } from '@/hooks/useSocket';
import { WifiOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ConnectionStatus = () => {
  const socket = useSocket();
  const [status, setStatus] = useState<'connected' | 'reconnecting' | 'offline'>('offline');

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => setStatus('connected');
    const onDisconnect = () => setStatus('offline');
    const onConnectError = () => setStatus('reconnecting');

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);

    if (socket.connected) {
      queueMicrotask(() => {
        setStatus('connected');
      });
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
    };
  }, [socket]);

  return (
    <AnimatePresence mode="wait">
      {status === 'connected' && (
        <motion.div
          key="connected"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-medium text-emerald-500">Live</span>
        </motion.div>
      )}

      {status === 'reconnecting' && (
        <motion.div
          key="reconnecting"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full"
        >
          <Loader2 className="w-3 h-3 text-amber-500 animate-spin" />
          <span className="text-xs font-medium text-amber-500">Reconnecting</span>
        </motion.div>
      )}

      {status === 'offline' && (
        <motion.div
          key="offline"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full"
        >
          <WifiOff className="w-3 h-3 text-rose-500" />
          <span className="text-xs font-medium text-rose-500">Offline</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
