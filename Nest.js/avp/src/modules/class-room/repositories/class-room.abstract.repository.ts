import { ClassRoomEntity } from '../entities/class-room.entity';

export abstract class ClassRoomAbstractRepository {
  abstract findAll(): Promise<Partial<any>[]>;
  abstract findOne(id: number): Promise<any | null>;
  abstract findOneByCoordId(coordId: number): Promise<ClassRoomEntity | null>;
  abstract update(
    id: number,
    data: Partial<ClassRoomEntity>,
  ): Promise<ClassRoomEntity>;
}
