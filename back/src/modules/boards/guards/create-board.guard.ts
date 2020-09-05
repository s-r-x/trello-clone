import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';

@Injectable()
export class CreateBoardGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: string = req.user;
    const body: CreateBoardDto = req.body;
    return user === body.owner;
  }
}
