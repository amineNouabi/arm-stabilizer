'use client';

import socket from '@/lib/socket';
import { useSocket } from '@/providers/socket-provider';
import * as am5 from '@amcharts/amcharts5';
import am5themesDark from '@amcharts/amcharts5/themes/Dark';
import am5themesResponsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

let controlRoot: am5.Root;
let controlChart: am5xy.XYChart;

let controlSeries: am5xy.ColumnSeries;
let controlXAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>;
let controlYAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;

export function SymmetricControlChart(): React.ReactNode {
  const { theme } = useTheme();
  const { data } = useSocket();

  useEffect(() => {
    controlRoot = am5.Root.new('symmetric-control-chart');

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
        paddingTop: 20,
      }),
    );

    controlXAxis = controlChart.xAxes.push(
      am5xy.CategoryAxis.new(controlRoot, {
        renderer: am5xy.AxisRendererX.new(controlRoot, {}),
        categoryField: 'side',
      }),
    );

    controlXAxis.data.setAll([
      { side: 'Motor 1 Seed' },
      { side: 'Motor 2 Seed' },
    ]);

    controlSeries = controlChart.series.push(
      am5xy.ColumnSeries.new(controlRoot, {
        name: 'Motor 2',
        xAxis: controlXAxis,
        yAxis: controlYAxis,
        valueYField: 'value',
        categoryXField: 'side',
        stroke: am5.color(0xff7979),
      }),
    );

    return () => {
      controlRoot.dispose();
    };
  }, [socket]);

  useEffect(() => {
    if (theme === 'dark') {
      controlRoot.setThemes([am5themesDark.new(controlRoot)]);
    } else {
      controlRoot.setThemes([]);
    }
  }, [theme]);

  useEffect(() => {
    if (!data) return;

    controlSeries.data.setAll([
      { side: 'Motor 1 Seed', value: data.controlThreshold },
      { side: 'Motor 2 Seed', value: -data.controlThreshold },
    ]);
  }, [data]);

  return (
    <Card className="pr-3 pb-5">
      <CardHeader>
        <CardTitle>Symmetric Control Chart : </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[300px]" id="symmetric-control-chart" />
    </Card>
  );
}
