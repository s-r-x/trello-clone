import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { PasswordService } from '@/modules/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXPIRES } from '@/config/jwt';
import { ITokenPayload } from './interface/token.interface';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  public async validateUser(login: string, password: string) {
    const user = await this.usersService
      .findByLogin(login)
      .select('+password');
    if (
      user &&
      (await this.passwordService.comparePasswords(password, user.password))
    ) {
      user.password = undefined;
      return user;
    } else {
      return null;
    }
  }
  public async login(user: User) {
    const payload: ITokenPayload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: JWT_EXPIRES,
      }),
      user,
    };
  }
}
