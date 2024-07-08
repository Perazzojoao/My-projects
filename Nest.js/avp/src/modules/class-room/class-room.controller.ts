import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  Post,
  HttpStatus,
  Query,
  Delete,
} from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { IdParseIntPipe } from 'src/resources/pipes/id-parse-int.pipe';
import { PublicRoute } from 'src/resources/decorators/public-route.decorator';
import { RemoveCoordIdInterceptor } from 'src/resources/interceptors/remove-coord-id.interceptor';
import { CoordOnlyPipe } from './validations/coord-only.pipe';
import { CreateClassRoomDto } from './dto/create-class.dto';

@Controller('class-room')
export class ClassRoomController extends DefaultHttpResponse {
  constructor(private readonly classRoomService: ClassRoomService) {
    super();
  }

  @Post(':id')
  async addStudent(
    @Param('id', IdParseIntPipe) id: number,
    @Body() createClassListDto: CreateClassRoomDto,
  ) {
    const classList = await this.classRoomService.addStudent(
      id,
      createClassListDto,
    );
    return this.success(
      classList,
      'Aluno(s) adicionados com cucesso',
      HttpStatus.CREATED,
    );
  }

  @Get('private')
  async findAll(@Query('coord') coordId: number) {
    const response = await this.classRoomService.findAll(coordId);
    return this.success(response, 'Turmas encontradas com sucesso');
  }

  @Get()
  @PublicRoute()
  @UseInterceptors(RemoveCoordIdInterceptor)
  async publicFindAll() {
    const response = await this.classRoomService.findAll();
    return this.success(response, 'Turmas encontradas com sucesso');
  }

  @Get(':id')
  async findOne(@Param('id', IdParseIntPipe) id: number) {
    const response = await this.classRoomService.findOne(id);
    return this.success(response, 'Turma encontrada com sucesso');
  }

  @Patch(':id')
  @Roles(['ADMIN', 'SECRE'])
  async update(
    @Param('id', IdParseIntPipe) id: number,
    @Body() updateClassRoomDto: UpdateClassRoomDto,
    @Body('coordId', CoordOnlyPipe) _: number | null,
  ) {
    const response = await this.classRoomService.update(id, updateClassRoomDto);
    return this.success(response, 'Turma atualizada com sucesso');
  }

  @Delete(':id')
  @Roles(['ADMIN', 'SECRE'])
  async remove(
    @Param('id', IdParseIntPipe) id: number,
    @Body() updateClassRoomDto: UpdateClassRoomDto,
  ) {
    const response = await this.classRoomService.removeStudents(id, updateClassRoomDto);
    return this.success(response, 'Alunos removidos com sucesso');
  }
}
