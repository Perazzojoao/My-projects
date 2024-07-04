import { IsNumber } from 'class-validator';

export class UpdateClassRoomDto {
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Este campo deve ser um número' },
  )
  coordId: number | null;
}
