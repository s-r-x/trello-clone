import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { ListsPolicies } from '../lists.policies';

@Injectable()
export class OpenListGuard implements CanActivate {
  constructor(@Inject(ListsPolicies) private listsPolicies: ListsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const listId: string = gqlArgsSelector(ctx).id;
    return this.listsPolicies.isUserAllowedToOpenList(listId, user);
  }
}
