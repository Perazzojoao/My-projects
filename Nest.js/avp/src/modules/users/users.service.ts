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
    const user = await this.userRepository.createUser(newUser);
    if (!user) {
      throw new BadRequestException('User not created');
    }

    const token = await this.jwtTokenService.generateToken(user);
    const { password, ...rest } = user;
    return { token, user: rest };
  }

  async findAll(role: string) {
    if (role in UserRole) {
      return await this.userRepository.findAll(role);
    }
    return await this.userRepository.findAll();
  }

  async findOne(id: number, userPayload?: JwtPayload) {
    if (!id) {
      throw new BadRequestException('Invalid user id');
    }

    if (userPayload?.sub !== id && userPayload?.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

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

  async update(id: number, userEntity: UserEntity, userPayload: JwtPayload) {
    if (!id) {
      throw new BadRequestException('Invalid user id');
    }

    if (userPayload.sub !== id && userPayload.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    const user = await this.findOne(id);
    Object.assign(user, userEntity);

    return await this.userRepository.update(id, { ...user });
  }

  async remove(id: number, userPayload: JwtPayload) {
    if (!id) {
      throw new BadRequestException('Invalid user id');
    }

    if (userPayload.sub !== id && userPayload.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const targetUser = await this.userRepository.remove(id);
    if (!targetUser) {
      throw new NotFoundException('User not found');
    }
    return targetUser;
  }
}
