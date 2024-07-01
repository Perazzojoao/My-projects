import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { cyan, green, white, yellow } from 'colors';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${cyan(request.method)} ${cyan(request.url)}: ` +
            yellow(`+${Date.now() - now}ms`),
          'Logger',
        );
      }),
    );
  }
}
