import type { Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import app from './app';
import { ArduinoClient, DEFAULT_BAUDRATE } from './utils/arduino';
import logger from './utils/logger';

const port = process.env.PORT || 5001;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const arduinoClient = new ArduinoClient(io);

arduinoClient.connect().catch((error) => {
  logger.error(`Error: ${error.message}`);
});

app
  .get('/status', (_, res) => {
    if (!arduinoClient.isAlive()) {
      return res.status(200).json({
        serialPath: '',
        baudRate: '',
      });
    }
    return res.status(200).json({
      serialPath: arduinoClient.serial?.path,
      baudRate: arduinoClient.serial?.baudRate,
    });
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .put('/status', async (req: Request, res: Response) => {
    const baudRate = req.body.baudRate || `${DEFAULT_BAUDRATE}`;

    if (!arduinoClient.serial || !arduinoClient.isAlive()) {
      const { error } = await arduinoClient.connect(baudRate);
      if (error) {
        return res.status(200).json({
          serialPath: '',
          baudRate: '',
        });
      }
      return res.status(200).json({
        serialPath: arduinoClient.serial?.path,
        baudRate: arduinoClient.serial?.baudRate,
      });
    }

    try {
      parseInt(baudRate, 10);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid baud rate' });
    }

    try {
      arduinoClient.serial.update({ baudRate: parseInt(baudRate, 10) });
    } catch (error: any) {
      logger.error(`Error: ${error?.message || 'Unknown error'}`);
      return res.status(500).json({ error: 'Error updating baud rate' });
    }

    return res.status(200).json({
      serialPath: arduinoClient.serial.path,
      baudRate: arduinoClient.serial.baudRate,
    });
  });

io.on('connection', (socket) => {
  logger.log('info', `Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.log('info', `Connection left (${socket.id})`);
  });
});

server.listen(port, () => {
  logger.info(
    `⚡️[server]: Server is running at http://localhost:${port} in DEV mode`,
  );
});
