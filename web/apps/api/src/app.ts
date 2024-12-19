import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import morgan from 'morgan';
import arduinoClient from './utils/arduino';
import logger from './utils/logger';

const BAUD_RATES = [9600, 19200, 38400, 57600, 115200];

const app: Express = express();

app
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors())
  .get('/status', (_, res) => {
    if (!arduinoClient.isAlive()) {
      return res.status(500).json({ error: 'Serial port is not open' });
    }
    return res.status(200).json({
      serialPath: arduinoClient.serial?.path,
      baudRate: arduinoClient.serial?.baudRate,
    });
  })
  .put('/status', function updateBaudRate(req, res) {
    const { baudRate } = req.body;

    if (!arduinoClient.serial) {
      res.status(500).json({ error: 'Serial port is not open' });
      return;
    }

    try {
      parseInt(baudRate, 10);
    } catch (error) {
      res.status(400).json({ error: 'Invalid baud rate' });
      return;
    }

    if (!BAUD_RATES.includes(parseInt(baudRate, 10))) {
      res.status(400).json({ error: 'Invalid baud rate' });
      return;
    }

    try {
      arduinoClient.serial.update({ baudRate: parseInt(baudRate, 10) });
    } catch (error: any) {
      logger.error(`Error: ${error?.message || 'Unknown error'}`);
      res.status(500).json({ error: 'Error updating baud rate' });
      return;
    }

    res.status(200).json({
      serialPath: arduinoClient.serial.path,
      baudRate: arduinoClient.serial.baudRate,
    });
  });

export default app;
