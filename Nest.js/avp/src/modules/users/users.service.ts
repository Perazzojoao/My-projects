import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from './dto/create-user.dto';
import { UsersAbstractRepository } from './repositories/users.abstract.repository';
import { UserEntity } from './entities/user.entity';
import { JwtPayload, JwtTokenService } from '../../JWT/jwt-token.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersAbstractRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async create(userEntity: UserEntity) {
    const newUser = new UserEntity(userEntity);
    if (newUser.role !== UserRole.STUDENT) {
      newUser.isActive = true;
    }
    const user = await this.userRepository.createUser(newUser);
    if (!user) {
      throw new BadRequestException('User not created');
    }

    const token = await this.jwtTokenService.generateToken(user);
    return { token, user };
  }

  async findAll(role: string) {
    if (role in UserRole) {
      return await this.userRepository.findAllByRole(role);
    }
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
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
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isActive) {
      const targetUser = await this.userRepository.hardDelete(id);
      if (!targetUser) {
        throw new NotFoundException('User not found');
      }
      return targetUser;
    }

    const targetUser = await this.userRepository.remove(id);
    if (!targetUser) {
      throw new NotFoundException('User not found');
    }
    return targetUser;
  }
}
