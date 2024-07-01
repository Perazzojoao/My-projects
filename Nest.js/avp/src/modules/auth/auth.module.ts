import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenModule } from 'src/jwt/jwt-token.module';
import { JwtTokenService } from 'src/JWT/jwt-token.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [JwtTokenModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService, UsersService],
})
export class AuthModule {}
