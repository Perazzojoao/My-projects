import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { cyan, red } from 'colors';
import { Request } from 'express';
import { RequestWithUser } from 'src/resources/guards/auth.guard';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private logger: ConsoleLogger,
  ) {}

  catch(exception: T, host: ArgumentsHost) {
    const { httpAdapter } = this.adapterHost;

    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest<RequestWithUser>();
    const method = httpAdapter.getRequestMethod(request);
    const path = httpAdapter.getRequestUrl(request);

    const userAgent = request.get('user-agent') || '';
    const { ip } = request;
    const userId = request.user ? request.user.sub : '';

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: path,
            },
          };

    this.logger.error(
      `${userAgent} ${ip}: ${method + ' ' + path} -${userId ? ' User ID: '+userId+' -' : ''} ${exception}`,
      'ExceptionFilter',
    );

    httpAdapter.reply(response, body, status);
  }
}
