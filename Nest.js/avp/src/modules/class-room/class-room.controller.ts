import { Controller, Get, Body, Patch, Param, Req } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { RequestWithUser } from 'src/resources/guards/auth.guard';
import { DefaultHttpResponse } from 'src/lib/defaultHttpResponse';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { IdParseIntPipe } from 'src/resources/pipes/id-parse-int.pipe';

@Controller('class-room')
@Roles(['ADMIN', 'SECRE', 'COORD'])
export class ClassRoomController extends DefaultHttpResponse {
  constructor(private readonly classRoomService: ClassRoomService) {
    super();
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const response = await this.classRoomService.findAll(req.user);
    return this.success(response, 'Turmas encontradas com sucesso');
  }

  @Get(':id')
  async findOne(
    @Param('id', IdParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const response = await this.classRoomService.findOne(id, req.user);
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
