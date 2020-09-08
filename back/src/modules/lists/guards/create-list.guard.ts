import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { CreateListDto, createListDtoName } from '../dto/create-list.dto';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { ListsPolicies } from '../lists.policies';

@Injectable()
export class CreateListGuard implements CanActivate {
  constructor(@Inject(ListsPolicies) private listsPolicies: ListsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: CreateListDto = gqlArgsSelector(ctx)[createListDtoName];
    if (user !== data.creatorId) return false;
    return await this.listsPolicies.isUserAllowedToCreateList(data);
  }
}
