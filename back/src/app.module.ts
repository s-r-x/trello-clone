import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db';
import { UsersModule } from './modules/users/users.module';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, PasswordModule, AuthModule, BoardModule],
})
export class AppModule {}
