import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { BoardsPolicies } from '../boards.policies';
import { addBoardMemberDtoName } from '../dto/add-member.dto';
import { RemoveBoardMemberDto } from '../dto/remove-member.dto';

@Injectable()
export class RemoveBoardMemberGuard implements CanActivate {
  constructor(@Inject(BoardsPolicies) private boardsPolicies: BoardsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: RemoveBoardMemberDto = gqlArgsSelector(ctx)[
      addBoardMemberDtoName
    ];
    if (user === data.userId) {
      return false;
    }
    return this.boardsPolicies.isUserAllowedToRemoveMember(user, data.boardId);
  }
}
