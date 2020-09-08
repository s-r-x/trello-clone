import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { BoardsPolicies } from '../boards.policies';
import {
  addBoardMemberDtoName,
  AddBoardMemberDto,
} from '../dto/add-member.dto';

@Injectable()
export class AddBoardMemberGuard implements CanActivate {
  constructor(@Inject(BoardsPolicies) private boardsPolicies: BoardsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: AddBoardMemberDto = gqlArgsSelector(ctx)[addBoardMemberDtoName];
    if (user === data.userId) {
      return false;
    }
    return this.boardsPolicies.isUserAllowedToAddMember(user, data.boardId);
  }
}
