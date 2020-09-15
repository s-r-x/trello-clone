import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CheckItem } from '../schemas/check-item.gql.schema';
import { CheckItemsService } from '../check-items.service';
import { CardsService } from '@/modules/cards/cards.service';
import { Card } from '@/modules/cards/schemas/card.graphql.schema';
import { CheckListsService } from '@/modules/check-lists/check-lists.service';
import { CheckList } from '@/modules/check-lists/schemas/check-list.gql.schema';

@Resolver(() => CheckItem)
export class CheckItemsResolvers {
  constructor(
    private checkItemService: CheckItemsService,
    private cardsService: CardsService,
    private checkListsService: CheckListsService,
  ) {}

  @Query(() => CheckItem, { name: 'checkItem' })
  async getCheckItem(@Args('id') id: string) {
    return this.checkItemService.findById(id);
  }

  @Query(() => [CheckItem], { name: 'checkItems' })
  async getCheckItems() {
    return this.checkItemService.findMany();
  }
  @ResolveField(() => Card, { name: 'card' })
  async getCard(@Parent() checkItem: CheckItem) {
    return this.cardsService.findById(checkItem.cardId);
  }
  @ResolveField(() => CheckList, { name: 'checkList' })
  async getCheckList(@Parent() checkItem: CheckItem) {
    return this.checkListsService.findById(checkItem.checkListId);
  }
}
