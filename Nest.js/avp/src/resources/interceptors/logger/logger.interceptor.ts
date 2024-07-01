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
import { RequestWithUser } from 'src/resources/guards/auth.guard';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request | RequestWithUser>();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${request.method} ${request.url}${'user' in request ? ` - User ID: ${request.user.sub}` : ''} ` +
            yellow(`+${Date.now() - now}ms`),
          'Logger',
        );
      }),
    );
  }
}
