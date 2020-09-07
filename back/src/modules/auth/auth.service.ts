import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { PasswordService } from '@/modules/password/password.service';
import { LoginDto } from './dto/login.dto';
import { TCustomSession } from '@/typings';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
  ) {}
  public async login(data: LoginDto, session: TCustomSession) {
    const user = await this.usersService.findOne(
      { login: data.login },
      {
        select: '+password',
      },
    );
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (
      await this.passwordService.comparePasswords(data.password, user.password)
    ) {
      session.userId = user._id;
      return `hi ${user.login}`;
    } else {
      throw new ForbiddenException('bad password');
    }
  }
}
