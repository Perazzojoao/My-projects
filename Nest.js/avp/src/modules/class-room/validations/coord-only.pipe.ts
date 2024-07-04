import { BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserRole } from 'src/modules/users/dto/create-user.dto';
import { UsersAbstractRepository } from 'src/modules/users/repositories/users.abstract.repository';

@Injectable()
export class CoordOnlyPipe implements PipeTransform {
  constructor(private readonly usersRepository: UsersAbstractRepository) {}

  async transform(coordId: number | null) {
    if (coordId === null) {
      return null;
    }

    const user = await this.usersRepository.findOne(coordId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.role !== UserRole.COORD) {
      throw new BadRequestException('O campo coordId deve ser um id de coordenador válido');
    }
    
    return coordId;
  }
}
