import { Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.graphql.schema';
import { UseGuards } from '@nestjs/common';
import { CreateUserGuard } from '../guards/create-user.guard';

export class UsersMutations {
  constructor(private usersService: UsersService) {}

  @UseGuards(CreateUserGuard)
  @Mutation(() => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
