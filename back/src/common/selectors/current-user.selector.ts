import { ExecutionContext } from '@nestjs/common';
import { sessionSelector } from './session.selector';

export const currentUserSelector = (ctx: ExecutionContext) => {
  return sessionSelector(ctx).userId;
};
