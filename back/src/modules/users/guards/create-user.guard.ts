import {
  Injectable,
  Inject,
  ConflictException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto, createUserDtoName } from '../dto/create-user.dto';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';

@Injectable()
export class CreateUserGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  async canActivate(ctx: ExecutionContext) {
    const data: CreateUserDto = gqlArgsSelector(ctx)[createUserDtoName];
    if (data.email && (await this.usersService.isEmailExists(data.email))) {
      throw new ConflictException('email exists');
    }
    if (data.login && (await this.usersService.isLoginExists(data.login))) {
      throw new ConflictException('login exists');
    }
    return true;
  }
}
