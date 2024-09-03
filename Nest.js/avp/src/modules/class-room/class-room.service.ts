import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { ClassRoomRepository } from './repositories/class-room.ropository';
import { CreateClassRoomDto } from './dto/create-class.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ClassRoomService {
  constructor(
    private readonly classRoomRepository: ClassRoomRepository,
    private readonly usersService: UsersService,
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
    // Object.assign(classRoom, updateClassRoomDto);

    return await this.classRoomRepository.update(id, updateClassRoomDto);
  }

  async removeStudents(id: number, updateClassRoomDto: UpdateClassRoomDto) {
    const { students } = updateClassRoomDto;
    if (!students || students.length === 0) {
      throw new BadRequestException('Nenhum estudante informado');
    }

    const studentsToRemove = (await this.usersService.findAll('')).filter(student => students.includes(student.id)).map(student => student.id);
    if (!studentsToRemove || studentsToRemove.length === 0) {
      throw new BadRequestException('Nenhum estudante encontrado');
    }

    return await this.classRoomRepository.removeStudents(id, studentsToRemove);
  }
}
