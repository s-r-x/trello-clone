import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { ObjectId } from '@/typings';

@Injectable()
export class CreateBoardGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: ObjectId = req.user;
    const body: CreateBoardDto = req.body;
    return user === body.owner;
  }
}
