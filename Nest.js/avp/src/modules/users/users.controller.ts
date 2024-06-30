import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { UserEntity } from './entities/user.entity';
import { PasswordHashPipe } from 'src/resources/pipes/password-hash.pipe';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController extends DefaultHttpResponse{
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Body('password', PasswordHashPipe) hash: string) {
    createUserDto.password = hash;
    const user = await this.usersService.create(createUserDto as UserEntity);
    return this.success(HttpStatus.CREATED, 'User created successfully', user);
  }

  @Get()
  async findAll(@Query('role') role: string) {
    const user = await this.usersService.findAll(role);
    return this.success(HttpStatus.OK, 'Users fetched successfully', user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return this.success(HttpStatus.OK, 'User fetched successfully', user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.usersService.update(+id, updateUserDto as UserEntity);
    return this.success(HttpStatus.OK, 'User updated successfully', user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);
    return this.success(HttpStatus.OK, 'User deleted successfully', user);
  }
}
