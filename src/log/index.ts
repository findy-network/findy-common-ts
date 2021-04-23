import { createLogger, format, transports } from 'winston';

const { Console } = transports;

const outputFormat = format.printf(
  (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
);

const logConfig = {
  level: process.env.FINDY_CTS_LOG_LEVEL ?? 'info',
  format: format.combine(format.colorize(), format.timestamp(), outputFormat),
  transports: [new Console()],
  exceptionHandlers: [new Console()],
  exitOnError: false
};

export default createLogger(logConfig);
