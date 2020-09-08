import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { CardsPolicies } from '../cards.policies';

@Injectable()
export class RemoveCardGuard implements CanActivate {
  constructor(@Inject(CardsPolicies) private cardsPolicies: CardsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const cardId: string = gqlArgsSelector(ctx).id;
    return this.cardsPolicies.isUserAllowedToRemoveCard(cardId, user);
  }
}
