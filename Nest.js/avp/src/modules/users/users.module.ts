import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAbstractRepository } from './repositories/users.abstract.repository';
import { UsersRepository } from './repositories/users.repository';
import { EmailUniqueValidator } from './validations/email/email-unique.decorator';
import { AdminUniqueValidator } from './validations/admin/admin-unique.decorator';
import { JwtTokenService } from 'src/JWT/jwt-token.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/resources/guards/roles.guard';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    EmailUniqueValidator,
    AdminUniqueValidator,
    JwtTokenService,
    {
      provide: UsersAbstractRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [UsersService, UsersAbstractRepository],
})
export class UsersModule {}
