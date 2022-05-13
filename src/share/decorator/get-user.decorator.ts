import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user;
    }
  },
);
