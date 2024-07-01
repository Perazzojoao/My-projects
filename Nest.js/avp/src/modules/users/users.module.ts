import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAbstractRepository } from './repositories/users.abstract.repository';
import { UsersRepository } from './repositories/users.repository';
import { EmailUniqueValidator } from './validations/email/email-unique.decorator';
import { AdminUniqueValidator } from './validations/admin/admin-unique.decorator';
import { JwtTokenModule } from 'src/jwt/jwt-token.module';
import { JwtTokenService } from 'src/JWT/jwt-token.service';

@Module({
  imports: [JwtTokenModule],
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
