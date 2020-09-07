import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.graphql.schema';
import { BoardsService } from '@/modules/boards/boards.service';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { ObjectId } from '@/typings';

@Resolver(() => User)
export class UsersResolvers {
  constructor(
    private usersService: UsersService,
    private boardsService: BoardsService,
  ) {}

  @UseGuards(AuthOnlyGuard)
  @Query(() => User, { name: 'me' })
  async me(@CurrentUser() user: ObjectId) {
    return this.usersService.findById(user);
  }
  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ResolveField('boards', () => [Board])
  async getBoards(@Parent() user: User): Promise<Board[]> {
    return this.boardsService.findMany({ owner: user._id });
  }
}
