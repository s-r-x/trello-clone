import { Resolver, Args, Query } from '@nestjs/graphql';
import { List } from '../schemas/list.graphql.schema';
import { ListsService } from '../lists.service';

@Resolver(() => List)
export class ListsResolver {
  constructor(private listsService: ListsService) {}
  @Query(returns => List, { name: 'list' })
  async getList(@Args('id') id: string): Promise<List> {
    return this.listsService.findById(id);
  }
  @Query(returns => [List], { name: 'lists' })
  async getLists(): Promise<List[]> {
    return this.listsService.findMany();
  }
}
