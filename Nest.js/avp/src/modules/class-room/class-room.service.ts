import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { ClassRoomRepository } from './repositories/class-room.ropository';

@Injectable()
export class ClassRoomService {
  constructor(
    private readonly classRoomRepository: ClassRoomRepository,
  ) {}

  async findAll() {
    return await this.classRoomRepository.findAll();
  }

  async findOne(id: number) {
    const classRoom = await this.classRoomRepository.findOne(id);
    if (!classRoom) {
      throw new NotFoundException('Turma não encontrada');
    }
    return classRoom;
  }

  async update(id: number, updateClassRoomDto: UpdateClassRoomDto) {
    const classRoom = await this.classRoomRepository.findOne(id);
    if (!classRoom) {
      throw new NotFoundException('Turma não encontrada');
    }
    // Object.assign(classRoom, updateClassRoomDto);

    return await this.classRoomRepository.update(id, updateClassRoomDto);
  }
}
