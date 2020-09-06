import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.schema';
import { BoardsService } from '@/modules/boards/boards.service';
import { Board } from '@/modules/boards/schemas/board.schema';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private boardsService: BoardsService,
  ) {}
  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @ResolveField('boards', returns => [Board])
  async getBoards(@Parent() user: User) {
    return this.boardsService.findMany({ owner: user._id });
  }
}
