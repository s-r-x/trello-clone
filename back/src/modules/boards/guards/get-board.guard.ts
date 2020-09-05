import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { BoardsService } from '@/modules/boards/boards.service';
import { ObjectId } from '@/typings';

@Injectable()
export class GetBoardGuard implements CanActivate {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: ObjectId = req.user;
    const id: ObjectId = req.params.id;
    return this.boardsService.isUserAllowedToRead(user, id);
  }
}
