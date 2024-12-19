import { createServer } from 'node:http';
import { Server } from 'socket.io';
import app from './app';
import arduinoClient from './utils/arduino';
import logger from './utils/logger';

const port = process.env.PORT || 5001;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

arduinoClient.connect(io).catch((error) => {
  logger.error(`Error: ${error.message}`);
});

io.on('connection', (socket) => {
  logger.log('info', `Client connected: ${socket.id}`);
});

server.listen(port, () => {
  logger.info(
    `⚡️[server]: Server is running at http://localhost:${port} in DEV mode`,
  );
});
