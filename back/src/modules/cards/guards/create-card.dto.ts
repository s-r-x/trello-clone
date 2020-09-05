import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { BoardsService } from '@/modules/boards/boards.service';
import { ObjectId } from '@/typings';
import { CreateCardDto } from '../dto/create-card.dto';

@Injectable()
export class CreateCardGuard implements CanActivate {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: ObjectId = req.user;
    const body: CreateCardDto = req.body;
    const [canAddCard] = await Promise.all([
      this.boardsService.isUserAllowedToWrite(user, body.board),
    ]);
    return canAddCard;
  }
}
