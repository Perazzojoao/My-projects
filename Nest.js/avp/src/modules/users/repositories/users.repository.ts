import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from '../entities/user.entity';
import { UsersAbstractRepository } from './users.abstract.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository implements UsersAbstractRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(userEntity: UserEntity): Promise<Promise<UserEntity>> {
    return await this.prisma.user.create({
      data: {
        ...userEntity,
        address: {
          create: userEntity.address,
        },
        personalInfo: {
          create: userEntity.personalInfo,
        },
      },
      include: {
        address: true,
        personalInfo: true,
      },
    });
  }

  async findAll(): Promise<Promise<UserEntity[]>> {
    return await this.prisma.user.findMany({
      include: {
        address: true,
        personalInfo: true,
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { address: true, personalInfo: true },
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(
    id: number,
    userEntity: Partial<UserEntity>,
  ): Promise<Promise<UserEntity>> {
    const { address, personalInfo, ...user } = userEntity;
    const { id: addressId, userId: addressUserId, ...addressData } = address;
    const { id: personalInfoId, userId, ...personalInfoData } = personalInfo;

    return await this.prisma.user.update({
      where: { id },
      data: {
        ...userEntity,
        address: {
          update: {
            where: { id: userEntity.address.id },
            data: addressData,
          },
        },
        personalInfo: {
          update: {
            where: { id: userEntity.personalInfo.id },
            data: personalInfoData,
          },
        },
      },
      include: {
        address: true,
        personalInfo: true,
      },
    });
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
