'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSocket } from '@/providers/socket-provider';
import * as am5 from '@amcharts/amcharts5';
import am5themesDark from '@amcharts/amcharts5/themes/Dark';
import am5themesResponsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const MAX_DATA_POINTS = 700; // Define the maximum number of data points

let controlRoot: am5.Root;

let controlChart: am5xy.XYChart;

let controlSeries: am5xy.LineSeries;

let controlXAxis: am5xy.DateAxis<am5xy.AxisRenderer>;
let controlYAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;

let controlLegend: am5.Legend;

export function ControlChart(): React.ReactNode {
  const { theme } = useTheme();
  const { data } = useSocket();

  useEffect(() => {
    controlRoot = am5.Root.new('control-chart');

    if (theme === 'dark') {
      controlRoot.setThemes([
        am5themesDark.new(controlRoot),
        am5themesResponsive.new(controlRoot),
      ]);
    } else {
      controlRoot.setThemes([am5themesResponsive.new(controlRoot)]);
    }

    const responsive = am5themesResponsive.new(controlRoot);

    controlChart = controlRoot.container.children.push(
      am5xy.XYChart.new(controlRoot, {}),
    );

    controlYAxis = controlChart.yAxes.push(
      am5xy.ValueAxis.new(controlRoot, {
        renderer: am5xy.AxisRendererY.new(controlRoot, {}),
        baseValue: 0,
        max: 400,
        min: -400,
        paddingTop: 0,
      }),
    );

    controlXAxis = controlChart.xAxes.push(
      am5xy.DateAxis.new(controlRoot, {
        renderer: am5xy.AxisRendererX.new(controlRoot, {}),
        baseInterval: {
          timeUnit: 'millisecond',
          count: 1,
        },
      }),
    );

    controlSeries = controlChart.series.push(
      am5xy.LineSeries.new(controlRoot, {
        name: 'control (x)',
        xAxis: controlXAxis,
        yAxis: controlYAxis,
        valueYField: 'value',
        valueXField: 'date',
        stroke: am5.color(0x4b7bec),
      }),
    );

    controlSeries.data.setAll([]);

    return () => {
      controlRoot.dispose();
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    controlSeries.data.push({
      date: new Date().getTime(),
      value: data.controlThreshold,
    });

    // Limit the data size
    if (controlSeries.data.length > MAX_DATA_POINTS) {
      controlSeries.data.shift();
    }
  }, [data]);

  useEffect(() => {
    if (theme === 'dark') {
      controlRoot.setThemes([
        am5themesDark.new(controlRoot),
        am5themesResponsive.new(controlRoot),
      ]);
    } else {
      controlRoot.setThemes([am5themesResponsive.new(controlRoot)]);
    }
  }, [theme]);

  return (
    <Card className="pr-3 pb-5">
      <CardHeader>
        <CardTitle>Control Chart : </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[300px] " id="control-chart" />
    </Card>
  );
}
