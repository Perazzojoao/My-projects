import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { UserEntity } from './entities/user.entity';
import { PasswordHashPipe } from 'src/resources/pipes/password-hash.pipe';
import { RequestWithUser } from 'src/resources/guards/auth.guard';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { IdParseIntPipe } from 'src/resources/pipes/id-parse-int.pipe';
import { UserPermInterceptor } from 'src/resources/interceptors/user-perm.interceptor';

@Controller('users')
export class UsersController extends DefaultHttpResponse {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post()
  @Roles(['ADMIN'])
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body('password', PasswordHashPipe) hash: string,
  ) {
    createUserDto.password = hash;
    const newUser = await this.usersService.create(createUserDto as UserEntity);
    return this.success(
      newUser,
      'User created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @Roles(['ADMIN'])
  async findAll(@Query('role') role: string) {
    const user = (await this.usersService.findAll(role)).map(
      ({ password, ...rest }) => rest,
    );
    return this.success(user, 'Users fetched successfully');
  }

  @Get(':id')
  @UseInterceptors(new UserPermInterceptor())
  async findOne(@Param('id', IdParseIntPipe) id: number) {
    const { password, ...rest } = await this.usersService.findOne(id);
    return this.success(rest, 'User fetched successfully');
  }

  @Patch(':id')
  @UseInterceptors(new UserPermInterceptor())
  async update(
    @Param('id', IdParseIntPipe) id: number,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    const { password, ...rest } = await this.usersService.update(
      id,
      updateUserDto as UserEntity,
    );
    return this.success(rest, 'User updated successfully');
  }

  @Delete(':id')
  @UseInterceptors(new UserPermInterceptor())
  async remove(@Param('id', IdParseIntPipe) id: number) {
    const { id: userId, name, email } = await this.usersService.remove(id);
    return this.success({ userId, name, email }, 'User deleted successfully');
  }
}
