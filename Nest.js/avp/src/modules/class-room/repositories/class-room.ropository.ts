import { Injectable } from '@nestjs/common';
import { ClassRoomEntity } from '../entities/class-room.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClassRoomRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll() {
    return await this.prisma.classRoom.findMany({
      include: {
        students: {
          select: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                personalInfo: {
                  select: {
                    cpf: true,
                    rgm: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async findOne(id: number) {
    return await this.prisma.classRoom.findUnique({
      where: { id },
      include: {
        students: {
          select: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                personalInfo: {
                  select: {
                    cpf: true,
                    rgm: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async findOneByCoordId(coordId: number): Promise<ClassRoomEntity | null> {
    return await this.prisma.classRoom.findFirst({
      where: { coordId },
    });
  }
  async update(id: number, data: Partial<ClassRoomEntity>) {
    const { students, ...rest } = data;
    return await this.prisma.classRoom.update({
      where: { id },
      data: {
        students: {},
        ...rest,
      },
    });
  }
}
