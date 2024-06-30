import { $Enums, User } from "@prisma/client";
import { PersonalInfoEntity } from "./personal-Info.entity";
import { AddressEntity } from "./address.entity";

export class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;

  personalInfo?: PersonalInfoEntity;
  address?: AddressEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
