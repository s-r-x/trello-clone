import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { TGraphqlArgs } from '../dto/create-user.dto';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from '../users.service';

@Injectable()
export class CreateUserGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { createUserDto: data }: TGraphqlArgs = ctx.getArgs();
    if (data.email && (await this.usersService.isEmailExists(data.email))) {
      throw new ConflictException('email exists');
    }
    if (data.login && (await this.usersService.isLoginExists(data.login))) {
      throw new ConflictException('login exists');
    }
    return true;
  }
}
