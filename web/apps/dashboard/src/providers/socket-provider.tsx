'use client';

import { useAppStatus } from '@/hooks/use-app-status';
import { useInitializeSocket } from '@/hooks/use-initialize-socket';
import socket from '@/lib/socket';
import { createContext, useContext, useEffect, useState } from 'react';

interface SocketData {
  roll: number;
  pitch: number;
  yaw: number;
  controlThreshold: number;
}

interface SocketContextProps {
  data: SocketData | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [data, setData] = useState<SocketData | null>(null);

  const isConnected = useInitializeSocket();

  const {
    data: serialConfig,
    isLoading,
    error,
    isPendingUpdate,
    updateStatus,
  } = useAppStatus();

  useEffect(() => {
    socket.on('data', (receivedData: string) => {
      const splittedData = receivedData.trim().split('\t');
      if (splittedData.length !== 4) {
        console.log('splittedData.length !== 4');
        return;
      }

      try {
        const [roll, pitch, yaw, controlThreshold] =
          splittedData.map(parseFloat);
        setData({ roll, pitch, yaw, controlThreshold });
      } catch (error) {
        console.log('Error parsing data to number', error);
      }
    });

    socket.on('serial-closed', () => {
      updateStatus(115200);
    });

    return () => {
      socket.off('data');
      socket.off('serial-closed');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ data, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocketData must be used within a SocketProvider');
  }
  return context;
};
