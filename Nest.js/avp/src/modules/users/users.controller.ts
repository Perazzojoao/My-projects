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
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { UserEntity } from './entities/user.entity';
import { PasswordHashPipe } from 'src/resources/pipes/password-hash.pipe';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { IdParseIntPipe } from 'src/resources/pipes/id-parse-int.pipe';
import { CustomPermissions } from 'src/resources/decorators/custom-permissions.decorator';
import { RemovePasswordInterceptor } from 'src/resources/interceptors/remove-password.interceptor';

@Controller('users')
@CustomPermissions()
@UseInterceptors(RemovePasswordInterceptor)
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
    const user = await this.usersService.findAll(role);
    return this.success(user, 'Users fetched successfully');
  }

  @Get(':id')
  async findOne(@Param('id', IdParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return this.success(user, 'User fetched successfully');
  }

  @Patch(':id')
  @CustomPermissions()
  async update(
    @Param('id', IdParseIntPipe) id: number,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    const user = await this.usersService.update(
      id,
      updateUserDto as UserEntity,
    );
    return this.success(user, 'User updated successfully');
  }

  @Delete(':id')
  @CustomPermissions()
  async remove(@Param('id', IdParseIntPipe) id: number) {
    const { id: userId, name, email } = await this.usersService.remove(id);
    return this.success({ userId, name, email }, 'User deleted successfully');
  }
}
