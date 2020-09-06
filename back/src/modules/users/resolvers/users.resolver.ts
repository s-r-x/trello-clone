import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.graphql.schema';
import { BoardsService } from '@/modules/boards/boards.service';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { CreateUserGuard } from '../guards/create-user.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private boardsService: BoardsService,
  ) {}

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

  @UseGuards(CreateUserGuard)
  @Mutation(() => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
