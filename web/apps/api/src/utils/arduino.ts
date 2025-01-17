import { ReadlineParser, SerialPort } from 'serialport';
import type { Server as SocketServer } from 'socket.io';
import logger from './logger';

export const DEFAULT_BAUDRATE = 115200;
export const BAUD_RATES = [9600, 19200, 38400, 57600, 115200];

export class ArduinoClient {
  serial: SerialPort | undefined;
  socketServer: SocketServer;

  constructor(socketServer: SocketServer) {
    this.socketServer = socketServer;
  }

  async connect(
    baudRate: number = DEFAULT_BAUDRATE,
  ): Promise<{ error?: string; serialPath?: string; baudRate?: string }> {
    const ports = await SerialPort.list();
    const availablePorts = ports.filter((_port) => Boolean(_port.serialNumber));

    if (availablePorts.length === 0) {
      logger.error('No available serial ports found');
      return { error: 'No available serial devices.' };
    }

    this.serial = new SerialPort(
      {
        path: availablePorts[0].path,
        baudRate,
      },
      (error) => {
        if (error) {
          this.serial = undefined;
          throw error;
        }

        if (!this.serial) {
          logger.error('Serial port is not open');
          return;
        }

        this.serial.on('close', () => {
          logger.info('Serial port connection closed');
          this.socketServer.emit('serial-closed');
        });

        logger.info(
          `Connected to: Serial port ${availablePorts[0].path} at ${baudRate} baudrate`,
        );

        const parser = this.serial.pipe(
          new ReadlineParser({ delimiter: '\n' }),
        );

        parser.on('data', (data) => {
          this.socketServer.emit('data', data);
        });
      },
    );

    return {
      serialPath: availablePorts[0].path,
      baudRate: baudRate.toString(),
    };
  }

  updateSocketServer(io: SocketServer): void {
    this.socketServer = io;
  }

  isAlive(): boolean {
    return this.serial?.isOpen || false;
  }
}
