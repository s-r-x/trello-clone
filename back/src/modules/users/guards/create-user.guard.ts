import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { CreateUserDto, createUserDtoName } from '../dto/create-user.dto';

@Injectable()
export class CreateUserGuard {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  async canActivate(@Args(createUserDtoName) data: CreateUserDto) {
    if (data.email && (await this.usersService.isEmailExists(data.email))) {
      throw new ConflictException('email exists');
    }
    if (data.login && (await this.usersService.isLoginExists(data.login))) {
      throw new ConflictException('login exists');
    }
    return true;
  }
}
