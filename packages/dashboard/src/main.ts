import { CategoryScale, Chart, LineController, LineElement, LinearScale, PointElement, Title } from 'chart.js';
import io from 'socket.io-client';
import { create_accelo_chart, create_gyro_chart, create_magneto_chart } from './charts';
import './style.css';

// Import the necessary classes from Chart.js
Chart.register(LineController, LinearScale, PointElement, LineElement, Title, CategoryScale);


// Connect to the Socket.IO server
const socket = io('http://localhost:3000');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
	<canvas id="accelerometer_chart"></canvas>
	<canvas id="gyroscope_chart"></canvas>
	<canvas id="magnetometer_chart"></canvas>
  </div>
`

// Create a chart for accelerometer data
const accelerometer_canvas = document.getElementById('accelerometer_chart') as HTMLCanvasElement
const accelerometer_ctx = accelerometer_canvas.getContext('2d')
const accelerometer_chart = create_accelo_chart(accelerometer_ctx!);

// Create a chart for gyroscope data
const gyroscope_canvas = document.getElementById('gyroscope_chart') as HTMLCanvasElement;
const gyroscope_ctx = gyroscope_canvas.getContext('2d');
const gyroscope_chart = create_gyro_chart(gyroscope_ctx!);


// Create a chart for magnetometer data
const magnetometer_canvas = document.getElementById('magnetometer_chart') as HTMLCanvasElement
const magnetometer_ctx = magnetometer_canvas.getContext('2d')
const magnetometer_chart = create_magneto_chart(magnetometer_ctx!);


// When the client receives data from the server
socket.on('arduino:data', (data) => {
	console.log('Received data from Arduino:', data);
	const { ax, ay, az, gx, gy, gz, mx, my, mz, time } = JSON.parse(data);

	// Update the data in the charts
	accelerometer_chart.data.datasets[0].data = ax;
	accelerometer_chart.data.datasets[1].data = ay;
	accelerometer_chart.data.datasets[2].data = az;
	accelerometer_chart.data.labels = time;

	gyroscope_chart.data.datasets[0].data = gx;
	gyroscope_chart.data.datasets[1].data = gy;
	gyroscope_chart.data.datasets[2].data = gz;
	gyroscope_chart.data.labels = time;

	magnetometer_chart.data.datasets[0].data = mx;
	magnetometer_chart.data.datasets[1].data = my;
	magnetometer_chart.data.datasets[2].data = mz;
	magnetometer_chart.data.labels = time;


	// Update the charts
	accelerometer_chart.update();
	gyroscope_chart.update();
	magnetometer_chart.update();
});
