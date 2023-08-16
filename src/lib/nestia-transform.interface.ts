import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T extends object ? T : any;
}

@Injectable()
export class NestiaTransformInterceptor<T>
  implements NestInterceptor<T, Promise<Response<T>>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Promise<Response<T>>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map(async (data) => {
        data.success = true;

        return data;
      }),
    );
  }
}
