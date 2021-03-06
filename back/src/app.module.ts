import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoardsModule } from './modules/boards/boards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI, mongoConfig } from './config/db';
import { ListsModule } from './modules/lists/lists.module';
import { CardsModule } from './modules/cards/cards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RedisModule } from 'nestjs-redis';
import { regisConfig } from './config/redis';
import { SessionModule } from 'nestjs-session';
import * as session from 'express-session';
import * as ConnectRedis from 'connect-redis';
import { RedisService } from 'nestjs-redis';
import { sessionConfig } from './config/session';
import { CheckListsModule } from './modules/check-lists/check-lists.module';
import { CheckItemsModule } from './modules/check-items/check-items.module';
import { LabelsModule } from './modules/labels/labels.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    RedisModule.register(regisConfig),
    MongooseModule.forRoot(MONGO_URI, mongoConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src', 'typings', 'schema.gql'),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
    SessionModule.forRootAsync({
      inject: [RedisService],
      useFactory: async (redisService: RedisService) => {
        const RedisStore = ConnectRedis(session);
        const redisClient = redisService.getClient();
        const store = new RedisStore({ client: redisClient });
        return {
          session: {
            store,
            ...sessionConfig,
          },
        };
      },
    }),
    PasswordModule,
    AuthModule,
    UsersModule,
    BoardsModule,
    ListsModule,
    CardsModule,
    CheckListsModule,
    CheckItemsModule,
    LabelsModule,
    EmailModule,
  ],
})
export class AppModule {}
