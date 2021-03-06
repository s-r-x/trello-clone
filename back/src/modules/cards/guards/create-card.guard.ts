import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { CreateCardDto } from '../dto/create-card.dto';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';
import { createListDtoName } from '@/modules/lists/dto/create-list.dto';
import { CardsPolicies } from '../cards.policies';

@Injectable()
export class CreateCardGuard implements CanActivate {
  constructor(@Inject(CardsPolicies) private cardsPolicies: CardsPolicies) {}
  async canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: CreateCardDto = gqlArgsSelector(ctx)[createListDtoName];
    if (data.creatorId !== user) {
      return false;
    }
    return this.cardsPolicies.isUserAllowedToCreateCard(data);
  }
}
