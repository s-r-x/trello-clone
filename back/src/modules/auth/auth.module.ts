import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { PasswordModule } from '@/modules/password/password.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@/config/jwt';

@Module({
  imports: [
    UsersModule,
    PasswordModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
