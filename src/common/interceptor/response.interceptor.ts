import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomResponseDto } from './dto/response.dto';

type CustomResponse<T> = {
  success: boolean;
  code: number;
  data: T;
};

@Injectable()
export class CustomResponseInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponseDto<T>> {
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: res.statusCode,
        data,
      })),
    );
  }
}
