import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { IdParseIntPipe } from 'src/resources/pipes/id-parse-int.pipe';
import { PublicRoute } from 'src/resources/decorators/public-route.decorator';
import { RemoveCoordIdInterceptor } from 'src/resources/interceptors/remove-coord-id.interceptor';

@Controller('class-room')
export class ClassRoomController extends DefaultHttpResponse {
  constructor(private readonly classRoomService: ClassRoomService) {
    super();
  }

  @Get('private')
  async findAll() {
    const response = await this.classRoomService.findAll();
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
  ) {
    const response = await this.classRoomService.update(id, updateClassRoomDto);
    return this.success(response, 'Turma atualizada com sucesso');
  }
}
