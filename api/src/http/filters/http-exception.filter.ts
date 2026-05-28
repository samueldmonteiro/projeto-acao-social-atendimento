import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from '@/errors/domain.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let errors: any = null;

    if (exception instanceof DomainError) {
      code = exception.statusCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      code = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resMessage = (exceptionResponse as any).message;
        if (Array.isArray(resMessage)) {
          message = 'Erro de validação';
          errors = resMessage;
        } else if (typeof resMessage === 'string') {
          message = resMessage;
        } else {
          message = exception.message;
        }
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      this.logger.error(
        `[Unhandled Error] ${exception.message}`,
        exception.stack,
      );

      // If we are in development mode, we can expose the original error message
      if (process.env.NODE_ENV === 'development') {
        message = exception.message;
      }
    } else {
      this.logger.error(`[Unknown Exception] ${JSON.stringify(exception)}`);
    }

    // Standardized API error response format
    const errorResponse = {
      code,
      ok: false,
      message,
      ...(errors && { errors }),
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(code).json(errorResponse);
  }
}
