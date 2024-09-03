import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserRole } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class StudentOnlyValidator implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(studentsIds: number[]) {
    const students = await this.usersService.findAll(UserRole.STUDENT);
    const studentsIdsArray = students.map((student) => student.id);
    return studentsIds.every((studentId) => studentsIdsArray.includes(studentId));
  }
}

export const StudentOnly = (validationsOptions: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationsOptions,
      constraints: [],
      validator: StudentOnlyValidator,
      async: true,
    });
  };
};
