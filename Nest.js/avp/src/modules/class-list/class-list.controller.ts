import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ClassListService } from './class-list.service';
import { UpdateClassListDto } from './dto/update-class-list.dto';
import { IdParseIntPipe } from 'src/resources/pipes/id-parse-int.pipe';
import { CreateClassListDto } from './dto/create-class-list.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { Roles } from 'src/resources/decorators/roles.decorator';

@Controller('class-list')
@Roles(['ADMIN', 'SECRE'])
export class ClassListController extends DefaultHttpResponse {
  constructor(private readonly classListService: ClassListService) {
    super();
  }

  @Post(':id')
  async create(
    @Param('id', IdParseIntPipe) id: number,
    @Body() createClassListDto: CreateClassListDto,
  ) {
    const classList = await this.classListService.create(
      id,
      createClassListDto,
    );
    return this.success(
      classList,
      'Aluno(s) adicionados com cucesso',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @Roles(['ADMIN', 'SECRE', 'COORD', 'PRECE'])
  async findAll() {
    const classLists = await this.classListService.findAll();
    return this.success(classLists, 'Turmas retornadas com sucesso');
  }

  @Get(':id')
  @Roles(['ADMIN', 'SECRE', 'COORD', 'PRECE'])
  async findOne(@Param('id', IdParseIntPipe) id: number) {
    const classList = await this.classListService.findOne(id);
    return this.success(classList, 'Turma retornada com sucesso');
  }

  @Patch(':id')
  async update(
    @Param('id', IdParseIntPipe) id: number,
    @Body() updateClassListDto: UpdateClassListDto,
  ) {
    const classList = await this.classListService.update(
      id,
      updateClassListDto,
    );
    return this.success(classList, 'Turma atualizada com sucesso');
  }

  @Delete(':id')
  async remove(@Param('id', IdParseIntPipe) id: number) {
    const classList = await this.classListService.remove(id);
    return this.success(classList, 'Aluno(s) removidos com sucesso');
  }
}
