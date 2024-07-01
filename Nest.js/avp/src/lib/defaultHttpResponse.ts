import { HttpStatus } from '@nestjs/common';

export class DefaultHttpResponse {
  public success(data: unknown, message: string, statusCode?: HttpStatus) {
    if (!statusCode) {
      statusCode = HttpStatus.OK;
    }

    return {
      statusCode,
      message,
      data,
    };
  }
}
