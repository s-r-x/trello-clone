import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { ObjectId } from '@/typings';
import { BoardsPolicies } from '../boards.policies';

@Injectable()
export class GetBoardGuard implements CanActivate {
  constructor(@Inject(BoardsPolicies) private boardsPolicies: BoardsPolicies) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: ObjectId = req.user;
    const id: ObjectId = req.params.id;
    return this.boardsPolicies.isUserAllowedToRead(user, id);
  }
}
