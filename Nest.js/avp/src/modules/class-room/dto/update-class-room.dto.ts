import { IsNumber, IsOptional, Min } from 'class-validator';
import { CreateClassRoomDto } from './create-class.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateClassRoomDto extends PartialType(CreateClassRoomDto) {
  @IsOptional()
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Este campo deve ser um número' },
  )
  @Min(1, { message: 'Este campo deve ser maior que 0' })
  coordId?: number;
}
