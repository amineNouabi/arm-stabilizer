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

let orientationRoot: am5.Root;

let orientationChart: am5xy.XYChart;

let rollSeries: am5xy.LineSeries;
let pitchSeries: am5xy.LineSeries;
let yawSeries: am5xy.LineSeries;

let orientationXAxis: am5xy.DateAxis<am5xy.AxisRenderer>;
let orientationYAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;

let orientationLegend: am5.Legend;

export function OrientationChart(): React.ReactNode {
  const { theme } = useTheme();
  const { data } = useSocket();

  useEffect(() => {
    orientationRoot = am5.Root.new('orientation-chart');

    if (theme === 'dark') {
      orientationRoot.setThemes([
        am5themesDark.new(orientationRoot),
        am5themesResponsive.new(orientationRoot),
      ]);
    } else {
      orientationRoot.setThemes([am5themesResponsive.new(orientationRoot)]);
    }

    const responsive = am5themesResponsive.new(orientationRoot);

    orientationChart = orientationRoot.container.children.push(
      am5xy.XYChart.new(orientationRoot, {}),
    );

    orientationYAxis = orientationChart.yAxes.push(
      am5xy.ValueAxis.new(orientationRoot, {
        renderer: am5xy.AxisRendererY.new(orientationRoot, {}),
        baseValue: 0,
        max: 70,
        min: -70,
        paddingTop: 0,
      }),
    );

    orientationXAxis = orientationChart.xAxes.push(
      am5xy.DateAxis.new(orientationRoot, {
        renderer: am5xy.AxisRendererX.new(orientationRoot, {}),
        baseInterval: {
          timeUnit: 'millisecond',
          count: 1,
        },
      }),
    );

    rollSeries = orientationChart.series.push(
      am5xy.LineSeries.new(orientationRoot, {
        name: 'Roll (x)',
        xAxis: orientationXAxis,
        yAxis: orientationYAxis,
        valueYField: 'value',
        valueXField: 'date',
        stroke: am5.color(0x4b7bec),
      }),
    );

    rollSeries.data.setAll([]);

    pitchSeries = orientationChart.series.push(
      am5xy.LineSeries.new(orientationRoot, {
        name: 'Pitch (y)',
        xAxis: orientationXAxis,
        yAxis: orientationYAxis,
        valueYField: 'value',
        valueXField: 'date',
        stroke: am5.color(0xff7979),
      }),
    );

    pitchSeries.data.setAll([]);

    yawSeries = orientationChart.series.push(
      am5xy.LineSeries.new(orientationRoot, {
        name: 'Yaw (z)',
        xAxis: orientationXAxis,
        yAxis: orientationYAxis,
        valueYField: 'value',
        valueXField: 'date',
        stroke: am5.color(0xa55eea),
      }),
    );

    yawSeries.data.setAll([]);

    orientationLegend = orientationChart.children.push(
      am5.Legend.new(orientationRoot, {
        position: 'absolute',
        width: am5.percent(100),
        x: am5.percent(30),
        y: -5,
      }),
    );

    orientationLegend.data.setAll(orientationChart.series.values);

    return () => {
      orientationRoot.dispose();
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    rollSeries.data.push({
      date: new Date().getTime(),
      value: data.roll,
    });

    pitchSeries.data.push({
      date: new Date().getTime(),
      value: data.pitch,
    });

    yawSeries.data.push({
      date: new Date().getTime(),
      value: data.yaw,
    });

    // Limit the data size
    if (rollSeries.data.length > MAX_DATA_POINTS) {
      rollSeries.data.shift();
    }

    if (pitchSeries.data.length > MAX_DATA_POINTS) {
      pitchSeries.data.shift();
    }

    if (yawSeries.data.length > MAX_DATA_POINTS) {
      yawSeries.data.shift();
    }
  }, [data]);

  useEffect(() => {
    if (theme === 'dark') {
      orientationRoot.setThemes([
        am5themesDark.new(orientationRoot),
        am5themesResponsive.new(orientationRoot),
      ]);
    } else {
      orientationRoot.setThemes([am5themesResponsive.new(orientationRoot)]);
    }
  }, [theme]);

  return (
    <Card className="pr-3 pb-5">
      <CardHeader>
        <CardTitle>Orientation Chart : </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[300px] " id="orientation-chart" />
    </Card>
  );
}
