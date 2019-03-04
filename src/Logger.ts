import winston from "winston";

const transports =
  process.env.NODE_ENV === "test"
    ? [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ]
    : [
        new winston.transports.File({
          filename: "error.log",
          level: "error",
          maxsize: 500000,
        }),
        new winston.transports.File({
          filename: "combined.log",
          maxsize: 500000,
        }),
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ];

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports,
});

export { logger };
