import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController extends DefaultHttpResponse{
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto as UserEntity);
    return this.success(HttpStatus.CREATED, 'User created successfully', user);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>) {
    return this.usersService.update(+id, updateUserDto as UserEntity);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}