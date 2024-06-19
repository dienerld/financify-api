import { Request, Response } from 'express';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class ClearAuthCookie implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    if (!req.cookies) return next.handle();
    // get all cookies starts with "auth_"
    const cookies = Object.entries(req.cookies)
      .filter(([name, _]) => name.startsWith('auth_'))
      .map((c) => c[0]); // response only name

    cookies.forEach((cookie) => res.clearCookie(cookie));
    return next.handle();
  }
}
