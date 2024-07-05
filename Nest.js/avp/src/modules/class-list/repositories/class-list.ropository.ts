import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ClassListEntity } from '../entities/class-list.entity';

@Injectable()
export class ClassListRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: ClassListEntity) {
    const { students, ...classRoom } = data;
    const studentsIds = data.students as number[];
    return await this.prisma.classRoom.update({
      where: { id: classRoom.id },
      data: {
        students: {
          create: studentsIds.map((studentId) => ({
            student: {
              connect: { id: studentId },
            },
          })),
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
      select: {
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
  async findOne(id: number) {
    return await this.prisma.classRoomList.findUnique({
      where: {
        classRoomId_studentId: {
          classRoomId: id,
          studentId: id,
        },
      },
      select: {
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
    });
  }
  async findOneByCoordId(coordId: number) {
    return await this.prisma.classRoomList.findUnique({
      where: {
        classRoomId_studentId:{
          classRoomId: coordId,
          studentId: coordId,
        },
        classRoom: {
          coordId: coordId,
        }
      },
      select: {
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
    });
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
