import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to socket server:', socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
