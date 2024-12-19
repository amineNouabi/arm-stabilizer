import type { LinuxBindingInterface } from '@serialport/bindings-cpp';
import { ReadlineParser, SerialPort } from 'serialport';
import type { Server as SocketServer } from 'socket.io';
import logger from './logger';

const serialBaudrate = 115200;

export class ArduinoClient {
  serial: SerialPort<LinuxBindingInterface> | undefined;

  async connect(
    io: SocketServer,
    baudRate: number = serialBaudrate,
  ): Promise<void> {
    const ports = await SerialPort.list();
    const availablePorts = ports.filter((_port) => Boolean(_port.serialNumber));

    if (availablePorts.length === 0) {
      logger.error('No available serial ports found');
      return;
    }

    this.serial = new SerialPort<LinuxBindingInterface>(
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

        logger.info(
          `Connected to: Serial port ${availablePorts[0].path} at ${baudRate} baudrate`,
        );

        const parser = this.serial.pipe(
          new ReadlineParser({ delimiter: '\n' }),
        );

        parser.on('data', (data) => {
          io.emit('data', data);
        });
      },
    );
  }

  isAlive(): boolean {
    return this.serial?.isOpen || false;
  }
}

const arduinoClient = new ArduinoClient();
export default arduinoClient;
