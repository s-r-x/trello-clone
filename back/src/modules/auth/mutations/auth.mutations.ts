import { Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { Session } from '@/common/decorators/session.decorator';
import { TCustomSession } from '@/typings';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthMutations {
  constructor(private authService: AuthService) {}

  @Mutation(() => String, { name: 'login' })
  async login(
    @Args('loginDto') loginDto: LoginDto,
    @Session() session: TCustomSession,
  ) {
    return this.authService.login(loginDto, session);
  }
}
