import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Card } from '../schemas/card.graphql.schema';
import { CardsService } from '../cards.service';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { BoardsService } from '@/modules/boards/boards.service';
import { List } from '@/modules/lists/schemas/list.graphql.schema';
import { ListsService } from '@/modules/lists/lists.service';
import { User } from '@/modules/users/schemas/user.graphql.schema';
import { UsersService } from '@/modules/users/users.service';

@Resolver(() => Card)
export class CardsResolver {
  constructor(
    private cardsService: CardsService,
    private boardsService: BoardsService,
    private listsService: ListsService,
    private usersService: UsersService,
  ) {}
  @Query(() => Card, { name: 'card' })
  async getCard(@Args('id') id: string): Promise<Card> {
    return this.cardsService.findById(id);
  }
  @Query(() => [Card], { name: 'cards' })
  async getCards(): Promise<Card[]> {
    return this.cardsService.findMany();
  }
  @ResolveField('board', () => Board)
  async getBoard(@Parent() card: Card) {
    return this.boardsService.findById(card.board);
  }
  @ResolveField('list', () => List)
  async getList(@Parent() card: Card) {
    return this.listsService.findById(card.list);
  }
  @ResolveField('creator', () => User)
  async getCreator(@Parent() card: Card) {
    return this.usersService.findById(card.creator);
  }
}
