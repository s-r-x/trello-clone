import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { BoardsService } from '@/modules/boards/boards.service';
import { ObjectId } from '@/typings';
import { CreateCardDto } from '../dto/create-card.dto';
import { ListsService } from '@/modules/lists/lists.service';

@Injectable()
export class CreateCardGuard implements CanActivate {
  constructor(
    @Inject(BoardsService) private boardsService: BoardsService,
    @Inject(ListsService) private listsService: ListsService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: ObjectId = req.user;
    const { list, board }: CreateCardDto = req.body;
    const [writeAllowed, listExists] = await Promise.all([
      this.boardsService.isUserAllowedToWrite(user, board),
      this.listsService.isExists({ _id: list, board }),
    ]);
    return writeAllowed && listExists;
  }
}
