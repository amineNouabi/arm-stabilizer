import { addColors, createLogger, format, transports } from 'winston';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.colorize({ all: true }),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    ),
  ),
});

logger.add(
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
      ),
    ),
    level: 'debug',
  }),
);

export default logger;
