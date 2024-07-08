import { Injectable } from '@nestjs/common';
import { ClassRoomEntity } from '../entities/class-room.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClassRoomRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async addStudents(id: number, students: number[]) {
    return await this.prisma.classRoom.update({
      where: { id: id },
      data: {
        students: {
          create: students.map((id) => ({
            student: {
              connect: { id },
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
          orderBy: { studentId: 'asc' },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.classRoom.findMany({
      orderBy: { id: 'asc' },
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
          orderBy: {studentId: 'asc'},
        },
      },
    });
  }

  async findAllByCoordId(coordId: number) {
    return await this.prisma.classRoom.findMany({
      where: { coordId },
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
          orderBy: {studentId: 'asc'},
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
          orderBy: {studentId: 'asc'}
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

  async removeStudents(id: number, students: number[]) {
    return await this.prisma.classRoom.update({
      where: { id },
      data: {
        students: {
          delete: students.map((studentId) => ({
            classRoomId_studentId: {
              classRoomId: id,
              studentId,
            }
          })),
        }
      }
    });
  }
}
