import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';

@Injectable()
export class UpdateUserGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const id: string = gqlArgsSelector(ctx).id;
    return user === id;
  }
}
