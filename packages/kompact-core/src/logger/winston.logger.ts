import {
  createLogger,
  format,
  transports,
  type Logger as WinstonLogger,
} from 'winston';
import 'winston-daily-rotate-file';
import { Singleton } from '../decorator';

export type LogParams = {
  context: string;
  requestId: string | string[];
  metadata: unknown;
};
@Singleton()
class Logger {
  private readonly logger: WinstonLogger;

  constructor() {
    const formatPrint = format.printf(
      ({ level, message, context, requestId, timestamp, metadata }) => {
        return `${timestamp}::${level}::${context}::${requestId}::${message}::${JSON.stringify(
          metadata
        )}`;
      }
    );
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'DD-MM-YY HH:mm::ss' })
      ),
      transports: [
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'HH-DD-MM-YYYY',
          zippedArchive: true,
          maxSize: '14m',
          maxFiles: '14d',
          format: format.combine(
            format.timestamp({ format: 'DD-MM-YY HH:mm::ss' }),
            formatPrint
          ),
          level: 'info',
        }),
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'application-%DATE%.error.log',
          datePattern: 'HH-DD-MM-YYYY',
          zippedArchive: true,
          maxSize: '14m',
          maxFiles: '14d',
          format: format.combine(
            format.timestamp({ format: 'DD-MM-YY HH:mm::ss' }),
            formatPrint
          ),
          level: 'error',
        }),
      ],
    });
  }

  private formatParams({ requestId, context, metadata }: LogParams): any {
    // will be handle custom for the future
    return {
      requestId,
      context,
      metadata,
    };
  }

  log(message: string, params: LogParams): void {
    const paramLog = this.formatParams(params);
    const logObject = {
      message,
      ...paramLog,
    };
    this.logger.info(logObject);
  }

  error(message: string, params: LogParams): void {
    const paramLog = this.formatParams(params);
    const logObject = {
      message,
      ...paramLog,
    };
    this.logger.error(logObject);
  }
}
export const logger = new Logger();
