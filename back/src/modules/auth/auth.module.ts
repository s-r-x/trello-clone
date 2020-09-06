import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { PasswordModule } from '@/modules/password/password.module';
import { AuthMutations } from './mutations/auth.mutations';

@Module({
  imports: [UsersModule, PasswordModule],
  providers: [AuthService, AuthMutations],
})
export class AuthModule {}
