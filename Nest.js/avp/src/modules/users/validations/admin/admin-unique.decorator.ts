import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersAbstractRepository } from '../../repositories/users.abstract.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class AdminUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UsersAbstractRepository) {}

  async validate(role: string) {
    if (role !== 'ADMIN') return true;
    const admin = await this.userRepository.findAll(role);
    return !(admin.find((user) => user.role === 'ADMIN'));
  }
}

// Criando um decorator de validação personalizado
export const AdminUnique = (validationsOptions: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationsOptions,
      constraints: [],
      validator: AdminUniqueValidator,
    });
  };
};
