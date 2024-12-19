import socket from '@/lib/socket';
import { useEffect, useState } from 'react';
import { useToast } from './use-toast';

export function useInitializeSocket(): boolean {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    if (socket.connected) {
      onConnect();
      toast({ title: 'Connected to socket server' });
    }

    function onConnect(): void {
      toast({ title: 'Connected to socket server' });

      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect(): void {
      toast({
        title: 'Disconnected from socket server',
        variant: 'destructive',
      });
      setIsConnected(false);
      setTransport('N/A');
    }

    function onError(error: Error): void {
      console.log('Socket error---------------');
      console.error('Socket error:', error);
    }

    function onConnectError(error: Error): void {
      console.log('Socket connect error---------------');
      console.error('Socket connect error:', error);

      toast({
        title: 'Error connecting to socket server',
        variant: 'destructive',
      });
    }

    socket.on('connect', onConnect);

    socket.on('disconnect', onDisconnect);

    socket.on('error', onError);

    socket.on('connect_error', onConnectError);

    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

      socket.off('error', onError);
      socket.off('connect_error', onConnectError);
    };
  }, []);

  return isConnected;
}
