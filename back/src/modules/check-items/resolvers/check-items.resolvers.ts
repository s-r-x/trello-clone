import { Resolver, Query, Args } from '@nestjs/graphql';
import { CheckItem } from '../schemas/check-item.gql.schema';
import { CheckItemsService } from '../check-items.service';

@Resolver(() => CheckItem)
export class CheckItemsResolvers {
  constructor(private checkItemService: CheckItemsService) {}

  @Query(() => CheckItem, { name: 'checkItem' })
  async getCheckItem(@Args('id') id: string) {
    return this.checkItemService.findById(id);
  }

  @Query(() => [CheckItem], { name: 'checkItems' })
  async getCheckItems() {
    return this.checkItemService.findMany();
  }
}
