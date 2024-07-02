import { $Enums, User } from "@prisma/client";
import { PersonalInfoEntity } from "./personal-Info.entity";
import { AddressEntity } from "./address.entity";

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;
  name: string;
  email: string;
  password: string;
  role: $Enums.Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  personalInfo: PersonalInfoEntity | null;
  address: AddressEntity | null;
}
