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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { UserEntity } from './entities/user.entity';
import { PasswordHashPipe } from 'src/resources/pipes/password-hash.pipe';
import { AuthGuard } from 'src/resources/guards/auth.guard';

@Controller('users')
export class UsersController extends DefaultHttpResponse {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post()
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
  @UseGuards(AuthGuard)
  async findAll(@Query('role') role: string) {
    const user = (await this.usersService.findAll(role)).map(
      ({ password, ...rest }) => rest,
    );
    return this.success(user, 'Users fetched successfully');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const { password, ...rest } = await this.usersService.findOne(+id);
    return this.success(rest, 'User fetched successfully');
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    const { password, ...rest } = await this.usersService.update(
      +id,
      updateUserDto as UserEntity,
    );
    return this.success(rest, 'User updated successfully');
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const { id: userId, name, email } = await this.usersService.remove(+id);
    return this.success({ userId, name, email }, 'User deleted successfully');
  }
}
