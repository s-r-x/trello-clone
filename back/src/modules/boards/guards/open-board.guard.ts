import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { BoardsService } from '@/modules/boards/boards.service';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';

@Injectable()
export class OpenBoardGuard implements CanActivate {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const boardId: string = gqlArgsSelector(ctx).id;
    return this.boardsService.isUserAllowedToOpenBoard(user, boardId);
  }
}
