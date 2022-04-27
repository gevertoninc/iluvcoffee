import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const Protocol = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().protocol;
  },
);

export { Protocol };
