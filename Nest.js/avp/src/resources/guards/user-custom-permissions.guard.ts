import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { RequestWithUser } from './auth.guard';
import { CustomPermissions } from '../decorators/custom-permissions.decorator';

@Injectable()
export class UserCustomPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<RequestWithUser>();
    const roles = this.reflector.getAllAndOverride<
      Omit<'ADMIN', $Enums.Role>[] | []
    >('custom-permissions', [context.getHandler(), context.getClass()]);
    const { user } = request;

    if (user.role === $Enums.Role.ADMIN) {
      return true;
    }

    if (user.sub === Number(request.params.id)) {
      return true;
    }

    if (!(roles as Omit<'ADMIN', $Enums.Role>[]).includes(user.role)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
