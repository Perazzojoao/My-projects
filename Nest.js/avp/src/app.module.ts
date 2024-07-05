import { ConsoleLogger, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './resources/filters/http-exception/http-exception.filter';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  Reflector,
} from '@nestjs/core';
import { LoggerInterceptor } from './resources/interceptors/logger/logger.interceptor';
import { JwtTokenModule } from './jwt/jwt-token.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './resources/guards/auth.guard';
import { JwtTokenService } from './JWT/jwt-token.service';
import { RolesGuard } from './resources/guards/roles.guard';
import { ClassRoomModule } from './modules/class-room/class-room.module';
import { ClassListModule } from './modules/class-list/class-list.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtTokenModule,
    AuthModule,
    ClassRoomModule,
    ClassListModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ConsoleLogger,
    JwtTokenService,
  ],
})
export class AppModule {}
