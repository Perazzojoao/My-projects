import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload, JwtTokenService } from '../../JWT/jwt-token.service';
import { Reflector } from '@nestjs/core';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ignore = this.reflector.get<boolean>(
      'public-route',
      context.getHandler(),
    );
    if (ignore) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const token = this.getToken(request);
    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    const payload = await this.validateToken(token);
    request.user = payload;

    return true;
  }

  private getToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      return;
    }

    return token;
  }

  private async validateToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtTokenService.verifyToken(token);
      return payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
