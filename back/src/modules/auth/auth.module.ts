import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { PasswordModule } from '@/modules/password/password.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, PasswordModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
