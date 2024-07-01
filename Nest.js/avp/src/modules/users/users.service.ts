import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from './dto/create-user.dto';
import { UsersAbstractRepository } from './repositories/users.abstract.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersAbstractRepository) {}

  async create(userEntity: UserEntity) {
    const newUser = new UserEntity(userEntity);
    return await this.userRepository.createUser(newUser);
  }

  async findAll(role: string) {
    if (role in UserRole) {
      return await this.userRepository.findAll(role);
    }
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, userEntity: UserEntity) {
    if (!id) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.findOne(id);
    Object.assign(user, userEntity);

    return await this.userRepository.update(id, { ...user });
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.remove(id);
  }
}
