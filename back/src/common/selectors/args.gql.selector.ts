import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const gqlArgsSelector = (ctx: ExecutionContext) => {
  return GqlExecutionContext.create(ctx).getArgs();
};
