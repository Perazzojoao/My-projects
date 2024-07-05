import { ClassRoomEntity } from '../entities/class-room.entity';

export abstract class ClassRoomAbstractRepository {
  abstract findAll(): Promise<Partial<ClassRoomEntity>[]>;
  abstract findOne(id: number): Promise<ClassRoomEntity | null>;
  abstract findOneByCoordId(coordId: number): Promise<ClassRoomEntity | null>;
  abstract update(
    id: number,
    data: Partial<ClassRoomEntity>,
  ): Promise<ClassRoomEntity>;
}
