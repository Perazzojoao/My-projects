import { Module } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { ClassRoomController } from './class-room.controller';
import { ClassRoomRepository } from './repositories/class-room.ropository';
import { ClassRoomAbstractRepository } from './repositories/class-room.abstract.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ClassRoomController],
  providers: [
    ClassRoomService,
    {
      provide: ClassRoomAbstractRepository,
      useClass: ClassRoomRepository,
    },
  ],
  exports: [ClassRoomService, ClassRoomAbstractRepository],
})
export class ClassRoomModule {}
