import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TCustomSession } from '@/typings';

export class AuthOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req: Request = GqlExecutionContext.create(context).getContext().req;
    const session: TCustomSession = req.session;
    return Boolean(session.userId);
  }
}
