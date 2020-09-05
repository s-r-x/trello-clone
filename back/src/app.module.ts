import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db';
import { UsersModule } from './modules/users/users.module';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';
import { ListsModule } from './modules/lists/lists.module';
import { CardsModule } from './modules/cards/cards.module';
import { BoardsModule } from './modules/boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    PasswordModule,
    AuthModule,
    BoardsModule,
    ListsModule,
    CardsModule,
  ],
})
export class AppModule {}
