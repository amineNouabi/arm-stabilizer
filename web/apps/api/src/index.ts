import { log } from '@arm-stabilizer/logger';
import { ReadlineParser } from '@serialport/parser-readline';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createServer } from 'node:http';
import { SerialPort } from 'serialport';
import { Server } from 'socket.io';

const serialPort = '/dev/ttyACM0';
const serialBaudrate = 115200;

const port = process.env.PORT || 5001;

const app = express();
const server = createServer(app);
// Create a Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors())
  .get('/status', (_, res) => {
    return res.json({ ok: true });
  });

io.on('connection', (socket) => {
  log(`id: ${socket.id} connected`);
});

try {
  const mpuSerial = new SerialPort({
    path: serialPort,
    baudRate: serialBaudrate,
  });

  const parser = mpuSerial.pipe(new ReadlineParser({ delimiter: '\n' }));

  parser.on('data', (data) => {
    io.emit('data', data);
  });

  log(` Connected to: Serial port ${serialPort} at ${serialBaudrate} baudrate`);
} catch (error) {
  log(`Error: ${error}`);
}

server.listen(port, () => {
  log(`api running on ${port}`);
});
