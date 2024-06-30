import { Injectable, SetMetadata } from '@nestjs/common';
import { ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint, registerDecorator, ValidationOptions } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'isCpf', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return validateCpf(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'O campo cpf deve ser um CPF válido';
  }
}

export const IsCpf = (validationOptions: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CpfValidator,
    });
  };
}

function validateCpf(cpf: string) {
  if (typeof cpf === 'string' && cpf.length !== 11) return false;

  const blackList = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  if (blackList.includes(cpf)) return false;

  const regex = new RegExp('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}');
  if (!regex.test(cpf)) return false;

  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}
