import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'src/logger/logger.service';
import { randomPrefixUUID } from 'src/shared/utils/generators/random-prefix-uuid.generator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus: number = this.getExceptionHttpStatus(exception);
    const message: string = this.getExceptionMessage(exception);

    const requestId = request?.requestId || null;

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      message: message,
      error: {
        name: exception?.name,
        timestamp: new Date().toISOString(),
        requestPath: `${httpAdapter.getRequestMethod(request)} - ${httpAdapter.getRequestUrl(request)}`,
        requestId: requestId,
        refId: randomPrefixUUID('error'),
      },
    };

    this.logger.error(
      { ...responseBody.error, statusCode: httpStatus },
      exception?.stack,
      AllExceptionsFilter.name,
    );

    httpAdapter.reply(response, responseBody, httpStatus);
  }

  private getExceptionHttpStatus(exception: any): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getExceptionMessage(exception: any): string {
    if (exception instanceof HttpException) {
      return exception.message;
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return "Internal Server Error";
  }
}
