import { IsNotEmpty, IsNumber, IsArray, ArrayMinSize } from "class-validator";

export class CreateClassListDto {
  @IsNotEmpty({ message: 'O campo students não pode ser vazio', each: true })
  @IsNumber(
    { allowNaN: false },
    { each: true, message: 'O campo students deve ser um número' },
  )
  @IsArray({ message: 'O campo students deve ser um array' })
  @ArrayMinSize(1, { message: 'O campo students deve ter no mínimo 1 item' })
  students: number[];
}