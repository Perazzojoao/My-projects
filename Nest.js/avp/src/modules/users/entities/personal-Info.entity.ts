import { PersonalInfo } from "@prisma/client";

export class PersonalInfoEntity implements PersonalInfo {
  id: number;
  userId: number;
  cpf: string;
  rgm: string;
  profResgister: string;

  constructor(partial: Partial<PersonalInfoEntity>) {
    Object.assign(this, partial);
  }
}