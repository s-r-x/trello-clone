import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { sessionSelector } from '../selectors/session.selector';

export const Session = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return sessionSelector(ctx);
  },
);
