'use client';

import { ControlChart } from '@/components/charts/control-chart';
import { SymmetricControlChart } from '@/components/charts/symmetric-control-chart';
import { Spinner } from '@/components/ui/spinner';
import { useSocket } from '@/providers/socket-provider';

export default function ControlPage(): React.ReactNode {
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
  return (
    <div className="grid grid-rows-2 gap-5">
      <ControlChart />
      <SymmetricControlChart />
    </div>
  );
}
