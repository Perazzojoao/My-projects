import { Injectable } from '@nestjs/common';
import { ClassRoomEntity } from '../entities/class-room.entity';
import { ClassRoomAbstractRepository } from './class-room.abstract.repository';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClassRoomRepository implements ClassRoomAbstractRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll(): Promise<ClassRoomEntity[]> {
    return await this.prisma.classRoom.findMany();
  }
  async findOne(id: number): Promise<ClassRoomEntity | null> {
    return await this.prisma.classRoom.findUnique({
      where: { id },
    });
  }
  async update(id: number, data: Partial<ClassRoomEntity>): Promise<ClassRoomEntity> {
    return await this.prisma.classRoom.update({
      where: { id },
      data,
    });
  }
}
