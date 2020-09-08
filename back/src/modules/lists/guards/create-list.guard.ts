import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { CreateListDto, createListDtoName } from '../dto/create-list.dto';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { BoardsPolicies } from '@/modules/boards/boards.policies';

@Injectable()
export class CreateListGuard implements CanActivate {
  constructor(@Inject(BoardsPolicies) private boardPolicies: BoardsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: CreateListDto = gqlArgsSelector(ctx)[createListDtoName];
    if (user !== data.creatorId) return false;
    return await this.boardPolicies.isUserAllowedToWrite(user, data.boardId);
  }
}
