import { ClassRoomEntity } from '../entities/class-room.entity';

export abstract class ClassRoomAbstractRepository {
  abstract findAll(): Promise<ClassRoomEntity[]>;
  abstract findAllByCoordId(coordId: number): Promise<ClassRoomEntity[]>;
  abstract findOne(id: number): Promise<ClassRoomEntity | null>;
  abstract findOneByCoordId(id: number, coordId: number): Promise<ClassRoomEntity | null>;
  abstract update(
    id: number,
    data: Partial<ClassRoomEntity>,
  ): Promise<ClassRoomEntity>;
}
