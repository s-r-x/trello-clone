import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoardsModule } from './modules/boards/boards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI, mongoConfig } from './config/db';
import { ListsModule } from './modules/lists/lists.module';
import { CardsModule } from './modules/cards/cards.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, mongoConfig),
    UsersModule,
    PasswordModule,
    AuthModule,
    BoardsModule,
    ListsModule,
    CardsModule,
  ],
})
export class AppModule {}
