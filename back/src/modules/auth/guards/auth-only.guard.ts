import {
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { currentUserSelector } from '@/common/selectors/current-user.selector';

export class AuthOnlyGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const userId = currentUserSelector(ctx);
    if (!userId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
