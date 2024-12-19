'use client';

import { ControlChart } from './control-chart';
import { OrientationChart } from './orientation-chart';

export function HomeCharts(): React.ReactNode {
  return (
    <div className="grid grid-rows-2 gap-5">
      <OrientationChart />
      <ControlChart />
    </div>
  );
}
