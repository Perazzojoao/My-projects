import { Module } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { ClassRoomController } from './class-room.controller';
import { ClassRoomRepository } from './repositories/class-room.ropository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ClassRoomController],
  providers: [
    ClassRoomService,
    ClassRoomRepository,
  ],
  exports: [ClassRoomService, ClassRoomRepository],
})
export class ClassRoomModule {}
