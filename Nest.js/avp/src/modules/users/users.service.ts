import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersAbstractRepository } from './repositories/users.abstract.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersAbstractRepository) {}

  async create(userEntity: UserEntity) {
    const newUser = new UserEntity(userEntity);
    return await this.userRepository.createUser(newUser);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, userEntity: UserEntity) {
    const user = await this.findOne(id);

    Object.assign(user, userEntity);

    return await this.userRepository.update(id, { ...user });
  }

  async remove(id: number) {
    return await this.userRepository.remove(id);
  }
}