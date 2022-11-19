import winston from 'winston';

const transports = [new winston.transports.Console()];

/**
 * Logger instance.
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.metadata(),
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message} (metadata: ${JSON.stringify(info.metadata)})`,
    ),
  ),
  transports,
});

export { logger };
