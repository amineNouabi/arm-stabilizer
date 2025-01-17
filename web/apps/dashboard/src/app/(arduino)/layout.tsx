'use client';

import { Spinner } from '@/components/ui/spinner';
import { useAppStatus } from '@/hooks/use-app-status';
import { useSocket } from '@/providers/socket-provider';

export default function ArduinoLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { data: apiStatus, isLoading, error, isPendingUpdate } = useAppStatus();
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <h1>Connecting Socket...</h1>
        <Spinner size="large" />
      </div>
    );
  }

  if (isLoading || isPendingUpdate)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <h1>Connecting to Arduino...</h1>
        <Spinner size="large" />
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <h1 className="text-destructive text-4xl">
          Error communicating with server
        </h1>
      </div>
    );

  if (!apiStatus?.serialPath)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <h1 className="text-destructive text-2xl">
          Error: Arduino not found !
        </h1>
      </div>
    );

  return children;
}
