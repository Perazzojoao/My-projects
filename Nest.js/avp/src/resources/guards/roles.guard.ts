import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestWithUser } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (user.role === 'ADMIN') {
      return true;
    }

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }
}
