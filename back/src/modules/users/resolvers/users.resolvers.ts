import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.graphql.schema';
import { BoardsService } from '@/modules/boards/boards.service';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

class SomeGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    console.log(context.switchToHttp().getRequest());
    const ctx = GqlExecutionContext.create(context);
    const session = ctx.getContext()
    console.log(session.switchToHttp);
    return true;
  }
}

@Resolver(() => User)
export class UsersResolvers {
  constructor(
    private usersService: UsersService,
    private boardsService: BoardsService,
  ) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(SomeGuard)
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ResolveField('boards', () => [Board])
  async getBoards(@Parent() user: User): Promise<Board[]> {
    return this.boardsService.findMany({ owner: user._id });
  }
}
