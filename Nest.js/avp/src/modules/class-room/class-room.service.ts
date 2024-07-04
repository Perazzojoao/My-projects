import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { JwtPayload } from 'src/JWT/jwt-token.service';
import { ClassRoomAbstractRepository } from './repositories/class-room.abstract.repository';
import { UserRole } from '../users/dto/create-user.dto';
import { ClassRoomEntity } from './entities/class-room.entity';

@Injectable()
export class ClassRoomService {
  constructor(
    private readonly classRoomRepository: ClassRoomAbstractRepository,
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
    Object.assign(classRoom, updateClassRoomDto);

    return await this.classRoomRepository.update(id, classRoom);
  }
}
