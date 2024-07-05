import { Module } from '@nestjs/common';
import { ClassListService } from './class-list.service';
import { ClassListController } from './class-list.controller';
import { ClassListAbstractRepository } from './repositories/class-room.abstract.repository';
import { ClassListRepository } from './repositories/class-room.ropository';
import { ClassRoomModule } from '../class-room/class-room.module';
import { ClassRoomService } from '../class-room/class-room.service';

@Module({
  imports: [ClassRoomModule],
  controllers: [ClassListController],
  providers: [
    ClassListService,
    ClassRoomService,
    {
      provide: ClassListAbstractRepository,
      useClass: ClassListRepository,
    },
  ],
})
export class ClassListModule {}
