import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import morgan from 'morgan';

const app: Express = express();

app
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors());

export default app;
