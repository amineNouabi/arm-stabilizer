// import { ReadlineParser } from '@serialport/parser-readline';
import express from 'express';
import http from 'http';
// import { SerialPort } from 'serialport';
import cors from 'cors';
import { Server } from 'socket.io';
import { CircularBuffer } from './utils/circular-buffer';


// const serial_port = '/dev/ttyACM0';
// const serial_baudrate = 115200;
// let serial = null;
// let parser = null;

const server_port = process.env.PORT || 3000;

const circular_buffers = {
	ax: new CircularBuffer<number>(20),
	ay: new CircularBuffer<number>(20),
	az: new CircularBuffer<number>(20),
	gx: new CircularBuffer<number>(20),
	gy: new CircularBuffer<number>(20),
	gz: new CircularBuffer<number>(20),
	mx: new CircularBuffer<number>(20),
	my: new CircularBuffer<number>(20),
	mz: new CircularBuffer<number>(20),
	time: new CircularBuffer<number>(20),
};



// Create an express app
const app = express();

// Allow cross-origin requests
app.use(cors());

const server = http.createServer(app);

// Create a Socket.IO server
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));





// try
// {
// 	// Open a connection to the serial port
// 	serial = new SerialPort({ path: serial_port, baudRate: serial_baudrate });

// 	// Use the ReadlineParser parser
// 	parser = serial.pipe(new ReadlineParser({ delimiter: '\n' }));

// 	// When the parser receives data from the Arduino
// 	parser.on('data', (data) => {
// 		console.log('Received data from Arduino:', data);
// 		const parsed_data = data.toString().split(':').map(Number);

// 		if (parsed_data.length !== 10) {
// 			console.error('Invalid data received:', data);
// 			console.error('Expected 10 values, but received', parsed_data.length);
// 			return;
// 		}

// 		// Parse the data
// 		const [ax, ay, az, gx, gy, gz, mx, my, mz, time] = parsed_data;


// 		// Add the parsed values to the circular buffers
// 		circular_buffers.ax.push(ax);
// 		circular_buffers.ay.push(ay);
// 		circular_buffers.az.push(az);

// 		circular_buffers.gx.push(gx);
// 		circular_buffers.gy.push(gy);
// 		circular_buffers.gz.push(gz);

// 		circular_buffers.mx.push(mx);
// 		circular_buffers.my.push(my);
// 		circular_buffers.mz.push(mz);

// 		circular_buffers.time.push(time);

// 		// Emit the data to all connected Socket.IO clients
// 		io.emit('arduino:data', JSON.stringify(CircularBuffer.parse_circular_buffers(circular_buffers)));
// 	});
// }
// catch (error){
// 	console.error('Error opening the serial port:', error);
// }

// Start the server
server.listen(server_port, () => {
	console.log(`[server]: Server is running at http://localhost:${server_port}`);

	// Generate random data every 500ms
	setInterval(() => {
		// Generate random values
		const ax = Math.random() * 40 - 20;
		const ay = Math.random() * 40 - 20;
		const az = Math.random() * 40 - 20;
		const gx = Math.random() * 40 - 20;
		const gy = Math.random() * 40 - 20;
		const gz = Math.random() * 40 - 20;
		const mx = Math.random() * 40 - 20;
		const my = Math.random() * 40 - 20;
		const mz = Math.random() * 40 - 20;
		const time = Date.now();

		console.log('Generated data: ', ax, ay, az, gx, gy, gz, mx, my, mz, time);

		// Add the generated values to the circular buffers
		circular_buffers.ax.push(ax);
		circular_buffers.ay.push(ay);
		circular_buffers.az.push(az);
		circular_buffers.gx.push(gx);
		circular_buffers.gy.push(gy);
		circular_buffers.gz.push(gz);
		circular_buffers.mx.push(mx);
		circular_buffers.my.push(my);
		circular_buffers.mz.push(mz);
		circular_buffers.time.push(time);

		// Emit the data to all connected Socket.IO clients
		io.emit('arduino:data', JSON.stringify(CircularBuffer.parse_circular_buffers(circular_buffers)));
	}, 500);

});

// When a client connects to the Socket.IO server
io.on('connection', (socket) => {
	console.log('Connected client: socket.id : ', socket.id);
	// When the client disconnects
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});
