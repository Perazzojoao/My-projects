import { Address } from "@prisma/client";

export class AddressEntity implements Address {
  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
  
  id: number;
  userId: number;
  street: string;
  number: string;
  city: string;
  state: string;
  cep: string;
}