import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAbstractRepository } from './repositories/users.abstract.repository';
import { UsersRepository } from './repositories/users.repository';
import { EmailUniqueValidator } from './validations/email/email-unique.decorator';
import { AdminUniqueValidator } from './validations/admin/admin-unique.decorator';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    EmailUniqueValidator,
    AdminUniqueValidator,
    {
      provide: UsersAbstractRepository,
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
