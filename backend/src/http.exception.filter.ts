import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const { message } = exception.getResponse() as Record<string, any>;

    response.status(status).json({
      ok: false,
      error: Array.isArray(message) ? message[message.length - 1] : message,
    });
  }
}
