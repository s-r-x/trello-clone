import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TCustomSession } from '@/typings';

export const sessionSelector = (ctx: ExecutionContext): TCustomSession => {
  return GqlExecutionContext.create(ctx).getContext().req.session;
};
