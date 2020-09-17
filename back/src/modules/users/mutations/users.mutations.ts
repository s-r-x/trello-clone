import { Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto, createUserDtoName } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.graphql.schema';
import { UseGuards, Injectable } from '@nestjs/common';
import { CreateUserGuard } from '../guards/create-user.guard';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { updateUserDtoName, UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserGuard } from '../guards/update-user.guard';

@Injectable()
export class UsersMutations {
  constructor(private usersService: UsersService) {}

  @UseGuards(CreateUserGuard)
  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args(createUserDtoName) dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @UseGuards(AuthOnlyGuard, UpdateUserGuard)
  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') userId: string,
    @Args(updateUserDtoName) dto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, dto);
  }
}
