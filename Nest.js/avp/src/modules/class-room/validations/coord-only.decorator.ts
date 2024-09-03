import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  registerDecorator,
  ValidationError,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRole } from 'src/modules/users/dto/create-user.dto';
import { UsersAbstractRepository } from 'src/modules/users/repositories/users.abstract.repository';
import { ClassRoomRepository } from '../repositories/class-room.ropository';

@Injectable()
@ValidatorConstraint({ async: true })
export class CoordOnlyValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly usersRepository: UsersAbstractRepository,
    private readonly classRoomRepository: ClassRoomRepository,
  ) {}

  async validate(coordId: number | null) {
    if (!coordId) {
      return true;
    }

    const isCoord = await this.isCoord(coordId);
    if (!isCoord) {
      throw new BadRequestException('Id de coordenador inválido');
    }

    const isCoordUnique = await this.isCoordUnique(coordId);
    if (!isCoordUnique) {
      throw new BadRequestException(
        'Coordenador já está vinculado a uma turma',
      );
    }

    return true;
  }

  private async isCoord(coordId: number) {
    const user = await this.usersRepository.findOne(coordId);
    if (!user) {
      return false;
    }

    if (user.role !== UserRole.COORD) {
      return false;
    }

    return true;
  }

  private async isCoordUnique(coordId: number) {
    const classRoom = await this.classRoomRepository.findOneByCoordId(coordId);
    if (classRoom) {
      return false;
    }

    return true;
  }
}

export const CoordOnly = (validationsOptions: ValidationOptions = {}) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationsOptions,
      constraints: [],
      validator: CoordOnlyValidator,
      async: true,
    });
  };
};
