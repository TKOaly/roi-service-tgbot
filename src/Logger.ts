import winston from 'winston';

const transports =
    process.env.NODE_ENV === 'test'
        ? [new winston.transports.Console()]
        : [
              new winston.transports.File({
                  filename: 'error.log',
                  level: 'error',
                  maxsize: 500000,
                  dirname: 'logs',
              }),
              new winston.transports.File({
                  filename: 'combined.log',
                  maxsize: 500000,
                  dirname: 'logs',
              }),
              new winston.transports.Console(),
          ];

/**
 * Logger instance.
 */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.metadata(),
        winston.format.timestamp(),
        winston.format.printf(
            info => `${info.timestamp} ${info.level}: ${info.message} (metadata: ${JSON.stringify(info.metadata)})`,
        ),
    ),
    transports,
});

export { logger };
