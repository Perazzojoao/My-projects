import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IdParseIntPipe implements PipeTransform {
  transform(id: string) {
    if (!id) {
      throw new BadRequestException('Id inválido');
    }

    return parseInt(id, 10);
  }
}
