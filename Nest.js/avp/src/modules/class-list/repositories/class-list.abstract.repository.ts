import { Prisma } from '@prisma/client';
import { ClassListEntity } from '../entities/class-list.entity';

export abstract class ClassListAbstractRepository {
  abstract create(data: ClassListEntity): Promise<any>;
  abstract findAll(): Promise<any>;
  abstract findOne(id: number): Promise<Partial<ClassListEntity> | null>;
  abstract findOneByCoordId(coordId: number): Promise<ClassListEntity | null>;
  abstract update(
    id: number,
    data: Partial<ClassListEntity>,
  ): Promise<ClassListEntity>;
  abstract remove(id: number): Promise<ClassListEntity>;
}
