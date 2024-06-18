import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserJwt = {
  id: string;
  email: string;
  name: string;
};

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserJwt;
  },
);
