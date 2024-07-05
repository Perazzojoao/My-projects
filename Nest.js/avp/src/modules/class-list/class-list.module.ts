import { Module } from '@nestjs/common';
import { ClassListService } from './class-list.service';
import { ClassListController } from './class-list.controller';
import { ClassListRepository } from './repositories/class-list.ropository';
import { ClassRoomModule } from '../class-room/class-room.module';
import { ClassRoomService } from '../class-room/class-room.service';

@Module({
  imports: [ClassRoomModule],
  controllers: [ClassListController],
  providers: [
    ClassListService,
    ClassRoomService,
    ClassListRepository,
  ],
})
export class ClassListModule {}
