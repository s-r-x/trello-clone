import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { CreateListDto, createListDtoName } from '../dto/create-list.dto';
import { BoardsService } from '@/modules/boards/boards.service';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';

@Injectable()
export class CreateListGuard implements CanActivate {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: CreateListDto = gqlArgsSelector(ctx)[createListDtoName];
    if (user !== data.creatorId) return false;
    return await this.boardsService.isUserAllowedToWrite(user, data.boardId);
  }
}
