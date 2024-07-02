import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { HttpResponse } from 'src/lib/defaultHttpResponse';
import { UserEntity } from 'src/modules/users/entities/user.entity';

type Data = UserEntity | UserEntity[] | { token: string; user: UserEntity };
interface Response extends HttpResponse {
  data: Data;
}

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: Response) => {
        const { data, message, statusCode } = response;

        if (Array.isArray(data)) {
          return {
            message,
            statusCode,
            data: data.map((user) => {
              const { password, ...userData } = user;
              return userData;
            }),
          };
        }
        if ('token' in data) {
          const { user, token } = data;
          const { password, ...userData } = user;
          return {
            message,
            statusCode,
            data: { token, user: userData },
          };
        }
        const { password, ...userData } = data;
        return {
          message,
          statusCode,
          data: userData,
        };
      }),
    );
  }
}
