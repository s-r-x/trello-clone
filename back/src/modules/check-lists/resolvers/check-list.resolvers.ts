import { Resolver, Args, Query } from '@nestjs/graphql';
import { CheckList } from '../schemas/check-list.gql.schema';
import { CheckListsService } from '../check-lists.service';

@Resolver(() => CheckList)
export class CheckListsResolvers {
  constructor(private checkListsService: CheckListsService) {}

  @Query(() => CheckList, { name: 'checkList' })
  async getCheckList(@Args('id') id: string) {
    return this.checkListsService.findById(id);
  }
  @Query(() => [CheckList], { name: 'checkLists' })
  async getCheckLists() {
    return this.checkListsService.findMany();
  }
}
