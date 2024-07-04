import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpResponse } from 'src/lib/defaultHttpResponse';
import { ClassRoomEntity } from 'src/modules/class-room/entities/class-room.entity';

interface Response extends HttpResponse {
  data: ClassRoomEntity[];
}

@Injectable()
export class RemoveCoordIdInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: Response) => {
        const { data, message, statusCode } = response;

        const updatedData = data.map((classRoom) => {
          const { coordId, ...classRoomData } = classRoom;
          return classRoomData;
        });

        return {
          message,
          statusCode,
          data: updatedData,
        };
      }),
    );
  }
}
