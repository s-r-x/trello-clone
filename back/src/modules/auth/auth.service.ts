import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { PasswordService } from '@/modules/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/modules/users/user.entity';
import { JWT_EXPIRES } from '@/config/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  public async validateUser(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);
    if (
      user &&
      (await this.passwordService.comparePasswords(password, user.password))
    ) {
      const { password: p, ...rest } = user;
      return rest;
    } else {
      return null;
    }
  }
  public async login(user: Omit<User, 'password'>) {
    const payload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: JWT_EXPIRES,
      }),
      user,
    };
  }
}
