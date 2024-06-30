import { HttpStatus } from "@nestjs/common";

export class DefaultHttpResponse {
  public success(statusCode: HttpStatus, message: string, data?: any) {
    return {
      statusCode,
      message,
      data,
    };
  }
}
