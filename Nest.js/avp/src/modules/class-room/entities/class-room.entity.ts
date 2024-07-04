import { $Enums, ClassRoom } from "@prisma/client";

export class ClassRoomEntity implements ClassRoom {
  id: number;
  shift: $Enums.Shift;
  grade: $Enums.Grade;
  coordId: number | null;

  constructor (classRoom: Partial<ClassRoomEntity>) {
    Object.assign(this, classRoom)
  }
}
