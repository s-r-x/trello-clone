import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { BoardsService } from '../boards.service';
import { Board } from '../schemas/board.graphql.schema';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/schemas/user.graphql.schema';
import { ListsService } from '@/modules/lists/lists.service';
import { List } from '@/modules/lists/schemas/list.graphql.schema';
import { LabelsService } from '@/modules/labels/labels.service';
import { Label } from '@/modules/labels/schema/label.gql.schema';

@Resolver(() => Board)
export class BoardsResolvers {
  constructor(
    private boardsService: BoardsService,
    private usersService: UsersService,
    private listsService: ListsService,
    private labelsService: LabelsService,
  ) {}
  @Query(() => Board, { name: 'board' })
  async getBoard(@Args('id') id: string) {
    return this.boardsService.findById(id);
  }
  @Query(() => [Board], { name: 'boards' })
  async getBoards() {
    return this.boardsService.findMany();
  }
  @ResolveField('owner', () => User)
  async getOwner(@Parent() board: Board) {
    return this.usersService.findById(board.ownerId);
  }
  @ResolveField('lists', () => [List])
  async getLists(@Parent() board: Board) {
    return this.listsService.findMany({ board: board._id });
  }
  @ResolveField('members', () => [User])
  async getMembers(@Parent() board: Board) {
    return this.usersService.findByIds(board.membersIds);
  }
  @ResolveField('labels', () => [Label])
  async getLabels(@Parent() board: Board) {
    return this.labelsService.findMany({ boardId: board._id });
  }
}
