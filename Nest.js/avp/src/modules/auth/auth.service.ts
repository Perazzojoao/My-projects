import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from 'src/JWT/jwt-token.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtTokenService,
  ) {}

  async signup(userEntity: UserEntity) {
    return await this.userService.create(userEntity);
  }

  async login(logInDto: LogInDto) {
    const { email, password } = logInDto;

    const user = await this.userService.findOneByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    return {
      token: await this.jwtService.generateToken(user),
      user,
    }
  }
}
