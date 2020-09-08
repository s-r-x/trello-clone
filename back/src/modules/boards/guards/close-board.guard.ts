import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { BoardsPolicies } from '../boards.policies';

@Injectable()
export class CloseBoardGuard implements CanActivate {
  constructor(@Inject(BoardsPolicies) private boardsPolicies: BoardsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const boardId: string = gqlArgsSelector(ctx).id;
    return this.boardsPolicies.isUserAllowedToCloseBoard(user, boardId);
  }
}
