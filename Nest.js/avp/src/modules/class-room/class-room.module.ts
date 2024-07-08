import { Module } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { ClassRoomController } from './class-room.controller';
import { ClassRoomRepository } from './repositories/class-room.ropository';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtTokenService } from 'src/JWT/jwt-token.service';
import { StudentOnlyValidator } from './validations/student-only.decorator';

@Module({
  imports: [UsersModule],
  controllers: [ClassRoomController],
  providers: [
    ClassRoomService,
    ClassRoomRepository,
    UsersService,
    JwtTokenService,
    StudentOnlyValidator,
  ],
  exports: [],
})
export class ClassRoomModule {}
