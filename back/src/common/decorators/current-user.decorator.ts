import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { currentUserSelector } from '../selectors/current-user.selector';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return currentUserSelector(ctx);
  },
);
