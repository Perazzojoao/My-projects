import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsCpf } from '../validations/cpf/cpf.decorator';
import { EmailUnique } from '../validations/email/email-unique.decorator';

export enum UserRole {
  ADMIN = 'ADMIN',
  SECRE = 'SECRE',
  COORD = 'COORD',
  PRECE = 'PRECE',
  STUDENT = 'STUDENT',
}

class AddressDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo street é obrigatório' })
  street: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo number é obrigatório' })
  number: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo city é obrigatório' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo state é obrigatório' })
  state: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo cep é obrigatório' })
  cep: string;
}

class PersonalInfoDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  @IsCpf({ message: 'O campo cpf deve ser um CPF válido' })
  cpf: string;

  @IsOptional()
  @Length(10, 10, { message: 'O RGM deve conter exatamente 10 caracteres.' })
  rgm?: string;

  @IsOptional()
  @Min(0, { message: 'O campo profResgister deve ser um número positivo' })
  @IsNumber({}, { message: 'O campo profResgister deve ser um número' })
  profResgister?: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail({}, { message: 'O campo email deve ser um email válido' })
  @EmailUnique({ message: 'O email informado já está em uso' })
  email: string;

  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres.',
  })
  password: string;

  @IsNotEmpty({ message: 'O campo role é obrigatório' })
  @IsEnum(UserRole, { message: 'O campo role deve ser um valor válido' })
  role: UserRole;

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo personalInfo é obrigatório' })
  @Type(() => PersonalInfoDto)
  personalInfo: PersonalInfoDto;

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo address é obrigatório' })
  @Type(() => AddressDto)
  address: AddressDto;
}
