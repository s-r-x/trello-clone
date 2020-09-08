import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { BoardsService } from '@/modules/boards/boards.service';
import { CreateCardDto } from '../dto/create-card.dto';
import { ListsService } from '@/modules/lists/lists.service';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { createListDtoName } from '@/modules/lists/dto/create-list.dto';

@Injectable()
export class CreateCardGuard implements CanActivate {
  constructor(
    @Inject(BoardsService) private boardsService: BoardsService,
    @Inject(ListsService) private listsService: ListsService,
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: CreateCardDto = gqlArgsSelector(ctx)[createListDtoName];
    if (data.creatorId !== user) {
      return false;
    }
    const [writeAllowed, listExists] = await Promise.all([
      this.boardsService.isUserAllowedToWrite(user, data.boardId),
      this.listsService.isExists({ _id: data.listId, board: data.boardId }),
    ]);
    return writeAllowed && listExists;
  }
}
