import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { BoardsService } from '../boards.service';
import { Board } from '../schemas/board.schema';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/schemas/user.schema';

@Resolver(() => User)
export class BoardsResolver {
  constructor(
    private boardsService: BoardsService,
    private usersService: UsersService,
  ) {}
  @Query(returns => Board, { name: 'board' })
  async getBoard(@Args('id') id: string): Promise<Board> {
    return this.boardsService.findById(id);
  }
  @Query(returns => [Board], { name: 'boards' })
  async getBoards(): Promise<Board[]> {
    return this.boardsService.findMany();
  }
  @ResolveField('owner', returns => User)
  async getOwner(@Parent() board: Board) {
    return this.usersService.findById(board.owner);
  }
}
