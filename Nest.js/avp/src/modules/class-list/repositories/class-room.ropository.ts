import { Injectable } from '@nestjs/common';
import { ClassListAbstractRepository } from './class-room.abstract.repository';
import { DatabaseService } from 'src/database/database.service';
import { ClassListEntity } from '../entities/class-list.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class ClassListRepository implements ClassListAbstractRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: ClassListEntity) {
    const { students, ...classRoom } = data;
    const studentsIds = data.students as number[];
    return await this.prisma.classRoom.update({
      where: { id: classRoom.id },
      data: {
        students: {
          createMany: {
            data: studentsIds.map((student) => ({
              studentId: student,
            })),
          },
        },
      },
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
  async findAll() {
    return await this.prisma.classRoomList.findMany({
      include: {
        classRoom: {
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
        },
      },
      distinct: 'classRoomId',
    });
  }
  async findOne(id: number): Promise<Partial<ClassListEntity> | null> {
    throw new Error('Method not implemented.');
  }
  async findOneByCoordId(coordId: number): Promise<ClassListEntity | null> {
    throw new Error('Method not implemented.');
  }
  async update(
    id: number,
    data: Partial<ClassListEntity>,
  ): Promise<ClassListEntity> {
    throw new Error('Method not implemented.');
  }
  async remove(id: number): Promise<ClassListEntity> {
    throw new Error('Method not implemented.');
  }
}
