'use client';

import { useAppStatus } from '@/hooks/use-app-status';
import { ControlChart } from './control-chart';
import { OrientationChart } from './orientation-chart';

export function HomeCharts(): React.ReactNode {
  const { data: apiStatus } = useAppStatus();

  return (
    <div className="grid grid-rows-2 gap-5">
      <OrientationChart />
      <ControlChart />
    </div>
  );
}
