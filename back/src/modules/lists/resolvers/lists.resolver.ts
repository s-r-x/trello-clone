import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { List } from '../schemas/list.graphql.schema';
import { ListsService } from '../lists.service';
import { Card } from '@/modules/cards/schemas/card.graphql.schema';
import { CardsService } from '@/modules/cards/cards.service';
import { User } from '@/modules/users/schemas/user.graphql.schema';
import { UsersService } from '@/modules/users/users.service';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { BoardsService } from '@/modules/boards/boards.service';

@Resolver(() => List)
export class ListsResolver {
  constructor(
    private listsService: ListsService,
    private cardsService: CardsService,
    private usersService: UsersService,
    private boardsService: BoardsService,
  ) {}
  @Query(() => List, { name: 'list' })
  async getList(@Args('id') id: string): Promise<List> {
    return this.listsService.findById(id);
  }
  @Query(() => [List], { name: 'lists' })
  async getLists(): Promise<List[]> {
    return this.listsService.findMany();
  }
  @ResolveField('board', () => Board)
  async getBoard(@Parent() list: List) {
    return this.boardsService.findById(list.board);
  }
  @ResolveField('cards', () => Card)
  async getCards(@Parent() list: List) {
    return this.cardsService.findMany({ list: list._id });
  }
  @ResolveField('creator', () => User)
  async getCreator(@Parent() list: List) {
    return this.usersService.findById(list.creator);
  }
}
