import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { PasswordHashPipe } from 'src/resources/pipes/password-hash.pipe';
import { UserEntity } from '../users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { PublicRoute } from 'src/resources/decorators/public-route.decorator';
import { RemovePasswordInterceptor } from 'src/resources/interceptors/remove-password.interceptor';

@Controller('auth')
@UseInterceptors(RemovePasswordInterceptor)
export class AuthController extends DefaultHttpResponse {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('signup')
  @PublicRoute()
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
  @PublicRoute()
  async login(@Body() logInDto: LogInDto) {
    const response = await this.authService.login(logInDto);

    return this.success(response, 'User logged in successfully');
  }
}
