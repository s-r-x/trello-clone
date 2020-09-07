import { TCustomSession } from '@/typings';
import { Session } from '@/common/decorators/session.decorator';

export class AuthOnlyGuard {
  canActivate(@Session() session: TCustomSession) {
    return Boolean(session.userId);
  }
}
