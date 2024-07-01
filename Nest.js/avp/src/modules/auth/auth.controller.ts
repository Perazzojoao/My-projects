import {
  Controller,
  Post,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { PasswordHashPipe } from 'src/resources/pipes/password-hash.pipe';
import { UserEntity } from '../users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController extends DefaultHttpResponse {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('signup')
  async signup(
    @Body() signUpDto: SignUpDto,
    @Body('password', PasswordHashPipe) hash: string,
  ) {
    signUpDto.password = hash;
    const newUser = await this.authService.signup(signUpDto as UserEntity);
    return this.success(
      newUser,
      'User created successfully',
      HttpStatus.CREATED,
    );
  }

  @Post('login')
  async login(@Body() logInDto: LogInDto) {
    const response = await this.authService.login(logInDto);

    return this.success(response, 'Login realizado com sucesso');
  }
}
