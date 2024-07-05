import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { UserRole } from 'src/modules/users/dto/create-user.dto';
import { UsersAbstractRepository } from 'src/modules/users/repositories/users.abstract.repository';
import { ClassRoomRepository } from '../repositories/class-room.ropository';

@Injectable()
export class CoordOnlyPipe implements PipeTransform {
  constructor(
    private readonly usersRepository: UsersAbstractRepository,
    private readonly classRoomRepository: ClassRoomRepository,
  ) {}

  async transform(coordId: number | null) {
    if (coordId === null) {
      return null;
    }

    await this.isCoord(coordId);

    await this.isCoordUnique(coordId);

    return coordId;
  }

  private async isCoord(coordId: number) {
    const user = await this.usersRepository.findOne(coordId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.role !== UserRole.COORD) {
      throw new BadRequestException(
        'O campo coordId deve ser um id de coordenador válido',
      );
    }
  }

  private async isCoordUnique(coordId: number) {
    const classRoom = await this.classRoomRepository.findOneByCoordId(coordId);
    if (classRoom) {
      throw new BadRequestException(
        'Já existe uma sala de aula com esse coordenador',
      );
    }
  }
}
