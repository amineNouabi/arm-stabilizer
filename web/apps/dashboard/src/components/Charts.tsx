'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';
import type { Socket } from 'socket.io-client';

const MAX_DATA_POINTS = 700; // Define the maximum number of data points

let orientationRoot: am5.Root;
let controlRoot: am5.Root;
let orientationChart: am5xy.XYChart;
let controlChart: am5xy.XYChart;
let rollSeries: am5xy.LineSeries;
let pitchSeries: am5xy.LineSeries;
let yawSeries: am5xy.LineSeries;
let controlSeries: am5xy.ColumnSeries;
let orientationXAxis: am5xy.DateAxis<am5xy.AxisRenderer>;
let orientationYAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;
let controlXAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>;
let controlYAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;
let orientationLegend: am5.Legend;
let controlLegend: am5.Legend;

export function Charts({ socket }: { socket: Socket }) {
  useEffect(() => {
    orientationRoot = am5.Root.new('orientation-chart');
    controlRoot = am5.Root.new('control-chart');

    orientationChart = orientationRoot.container.children.push(
      am5xy.XYChart.new(orientationRoot, {}),
    );

    controlChart = controlRoot.container.children.push(
      am5xy.XYChart.new(controlRoot, {}),
    );

    orientationYAxis = orientationChart.yAxes.push(
      am5xy.ValueAxis.new(orientationRoot, {
        renderer: am5xy.AxisRendererY.new(orientationRoot, {}),
        baseValue: 0,
        max: 90,
        min: -90,
        paddingTop: 20,
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

    orientationLegend = orientationChart.children.push(
      am5.Legend.new(orientationRoot, {
        position: 'absolute',
        width: am5.percent(100),
        x: am5.percent(30),
        y: 0,
      }),
    );

    orientationLegend.data.setAll(orientationChart.series.values);

    socket.on('data', (receivedData: string) => {
      const [roll, pitch, yaw, motor1, motor2] = receivedData
        .trim()
        .split('\t');

      controlSeries.data.setAll([
        { side: 'Motor 1 Seed', value: parseFloat(motor1) - 1500 },
        { side: 'Motor 2 Seed', value: parseFloat(motor2) - 1500 },
      ]);

      const currentTime = new Date().getTime();
      rollSeries.data.push({
        date: currentTime,
        value: parseFloat(roll),
      });

      pitchSeries.data.push({
        date: currentTime,
        value: parseFloat(pitch),
      });

      yawSeries.data.push({
        date: currentTime,
        value: parseFloat(yaw),
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
    });

    return () => {
      orientationRoot.dispose();
      controlRoot.dispose();
      socket.off('data');
    };
  }, [socket]);

  return (
    <>
      <div id="orientation-chart" style={{ width: '100%', height: '400px' }} />
      <div id="control-chart" style={{ width: '100%', height: '400px' }} />
    </>
  );
}
