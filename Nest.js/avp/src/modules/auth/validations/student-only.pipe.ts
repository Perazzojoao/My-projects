import {
  ArgumentMetadata,
  BadRequestException,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserRole } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class StudentOnlyPipe implements PipeTransform {
  transform(value: UserRole) {
    if (value === UserRole.ADMIN) {
      return value;
    }

    if (value !== UserRole.STUDENT) {
      throw new ForbiddenException('Apenas alunos podem se cadastrar');
    }

    return value;
  }
}
