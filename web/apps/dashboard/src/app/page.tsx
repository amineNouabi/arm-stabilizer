'use client';

import { HomeCharts } from '@/components/charts/home-charts';
import { Spinner } from '@/components/ui/spinner';
import { useSocket } from '@/providers/socket-provider';

export default function HomePage(): JSX.Element {
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
        <h1>Connecting...</h1>
        <Spinner size="large" />
      </div>
    );
  }

  return <HomeCharts />;
}
