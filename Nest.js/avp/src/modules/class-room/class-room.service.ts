import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { ClassRoomRepository } from './repositories/class-room.ropository';
import { CreateClassRoomDto } from './dto/create-class.dto';

@Injectable()
export class ClassRoomService {
  constructor(
    private readonly classRoomRepository: ClassRoomRepository,
  ) {}

  async addStudent(id: number , createClassRoomDto: CreateClassRoomDto) {
    const { students } = createClassRoomDto;
    const classRoom = await this.classRoomRepository.findOne(id);
    if (!classRoom) {
      throw new NotFoundException('Turma não encontrada');
    }
    
    return await this.classRoomRepository.addStudents(id, students);
  }

  async findAll(coordId?: number) {
    if (coordId) {
      return await this.classRoomRepository.findAllByCoordId(coordId);
    }
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
    Object.assign(classRoom, updateClassRoomDto);

    return await this.classRoomRepository.update(id, updateClassRoomDto);
  }
}
