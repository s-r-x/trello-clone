import { Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto, createUserDtoName } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.graphql.schema';
import { UseGuards } from '@nestjs/common';
import { CreateUserGuard } from '../guards/create-user.guard';

export class UsersMutations {
  constructor(private usersService: UsersService) {}

  @UseGuards(CreateUserGuard)
  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args(createUserDtoName) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
