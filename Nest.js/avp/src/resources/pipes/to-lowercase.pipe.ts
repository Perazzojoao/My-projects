import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToLowercasePipe implements PipeTransform {
  transform(value?: string) {
    if (!value) {
      return value
    }
    return value.toLowerCase();
  }
}
