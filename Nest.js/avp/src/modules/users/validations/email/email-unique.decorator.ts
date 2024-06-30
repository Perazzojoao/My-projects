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
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UsersAbstractRepository) {}

  async validate(email: string) {
    const usuarioExiste = await this.userRepository.findOneByEmail(email);
    return !usuarioExiste;
  }
}

// Criando um decorator de validação personalizado
export const EmailUnique = (validationsOptions: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationsOptions,
      constraints: [],
      validator: EmailUniqueValidator,
    });
  };
};
