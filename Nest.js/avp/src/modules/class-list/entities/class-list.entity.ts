import { $Enums, ClassRoom } from '@prisma/client';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class ClassListEntity implements ClassRoom {
  constructor(classList: Partial<ClassListEntity>) {
    Object.assign(this, classList);
  }
  id: number;
  shift: $Enums.Shift;
  grade: $Enums.Grade;
  coordId: number | null;

  students: number[] | UserEntity[];
}
