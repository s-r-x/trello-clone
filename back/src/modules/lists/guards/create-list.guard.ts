import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { BoardsService } from '@/modules/boards/boards.service';
import { ObjectId } from '@/typings';

@Injectable()
export class CreateListGuard implements CanActivate {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: ObjectId = req.user;
    const body: CreateListDto = req.body;
    if (user !== body.creator) return false;
    return await this.boardsService.isUserAllowedToCreateList(user, body.board);
  }
}
