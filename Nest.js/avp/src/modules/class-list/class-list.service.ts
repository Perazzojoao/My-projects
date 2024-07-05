import { Injectable } from '@nestjs/common';
import { UpdateClassListDto } from './dto/update-class-list.dto';
import { CreateClassListDto } from './dto/create-class-list.dto';
import { ClassListAbstractRepository } from './repositories/class-room.abstract.repository';
import { ClassRoomService } from '../class-room/class-room.service';

@Injectable()
export class ClassListService {
  constructor(
    private readonly classListRepository: ClassListAbstractRepository,
    private readonly classRoomService: ClassRoomService,
  ) {}

  async create(id: number , createClassListDto: CreateClassListDto) {
    const { students } = createClassListDto;
    const classRoom = await this.classRoomService.findOne(id);
    return await this.classListRepository.create({
      ...classRoom,
      students,
    });
  }

  async findAll() {
    return await this.classListRepository.findAll();
  }

  async findOne(id: number) {
    return `This action returns a #${id} classList`;
  }

  async update(id: number, updateClassListDto: UpdateClassListDto) {
    return `This action updates a #${id} classList`;
  }

  async remove(id: number) {
    return `This action removes a #${id} classList`;
  }
}
