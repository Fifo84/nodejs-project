import path from "path";
import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";
import morgan from "morgan";

const __dirname = path.resolve();

const logDirectory = path.join(__dirname, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

export const requestLogger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: path.join(logDirectory, "requests"),
      filename: "request-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
    }),
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint()
  ),
});

export const errorLogger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: path.join(logDirectory, "errors"),
      filename: "errors-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
});

export const morganMiddleware = morgan(
  ":date[iso] :method :url :status :response-time ms",
  { stream: { write: (message) => requestLogger.info(message.trim()) } }
);
