import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateClassRoomDto {
  @IsOptional()
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Este campo deve ser um número' },
  )
  @Min(1, { message: 'Este campo deve ser maior que 0' })
  coordId: number | null;
}
