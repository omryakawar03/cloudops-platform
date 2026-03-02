
import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: {
    service: 'cloudops-backend',
    env: process.env.NODE_ENV || 'development',
    version: process.env.APP_VERSION || 'dev',
  },
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
  timestamp: pino.stdTimeFunctions.isoTime,
});