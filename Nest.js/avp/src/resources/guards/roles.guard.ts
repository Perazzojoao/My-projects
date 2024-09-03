import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }
}
