// src/common/logging.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from './logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;

        logger.info({
          requestId: request['requestId'],
          method: request.method,
          url: request.originalUrl,
          status: response.statusCode,
          durationMs: duration,
          ip: request.ip,
        });
      }),
    );
  }
}