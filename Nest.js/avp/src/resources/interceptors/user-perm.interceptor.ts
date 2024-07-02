import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestWithUser } from '../guards/auth.guard';
import { $Enums } from '@prisma/client';

/**
 * Interceptor to check if the user has permission to access a resource.
 * By default, only the resource owner and admin can access the resource.
 * @param roles Lists roles that can access the resource. If empty, only the resource owner and admin can access the resource.
*/

@Injectable()
export class UserPermInterceptor implements NestInterceptor {
  constructor(private readonly roles: $Enums.Role[] = []) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<RequestWithUser>();
    const { user } = request;

    if (user.role === $Enums.Role.ADMIN) {
      return next.handle();
    }

    if (user.sub === Number(request.params.id)) {
      return next.handle();
    }

    if (!this.roles.includes(user.role)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return next.handle();
  }
}
