import { Injectable } from '@nestjs/common';
import { UpdateClassListDto } from './dto/update-class-list.dto';
import { CreateClassListDto } from './dto/create-class-list.dto';
import { ClassRoomService } from '../class-room/class-room.service';
import { ClassListRepository } from './repositories/class-list.ropository';

@Injectable()
export class ClassListService {
  constructor(
    private readonly classListRepository: ClassListRepository,
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
    return await this.classListRepository.findOne(id);
  }

  async update(id: number, updateClassListDto: UpdateClassListDto) {
    return `This action updates a #${id} classList`;
  }

  async remove(id: number) {
    return `This action removes a #${id} classList`;
  }
}
