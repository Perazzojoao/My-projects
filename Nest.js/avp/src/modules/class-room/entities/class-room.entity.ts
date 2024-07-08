import { $Enums, ClassRoom } from "@prisma/client";
import { UserEntity } from "src/modules/users/entities/user.entity";

export class ClassRoomEntity implements ClassRoom {
  id: number;
  shift: $Enums.Shift;
  grade: $Enums.Grade;
  coordId: number | null;

  students?: UserEntity[] | number[];

  constructor (classRoom: Partial<ClassRoomEntity>) {
    Object.assign(this, classRoom)
  }
}
