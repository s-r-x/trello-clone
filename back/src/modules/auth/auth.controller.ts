import { Controller, Req, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  IRequestWithUser,
  IRequestWithUserId,
} from './interface/request.interface';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: IRequestWithUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: IRequestWithUserId) {
    const user = await this.usersService.findById(req.user);
    return this.usersService.extractPublicData(user);
  }
}
