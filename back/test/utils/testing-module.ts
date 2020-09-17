import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { regisConfig } from '@/config/redis';
import { MONGO_URI, mongoConfig } from '@/config/db';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionModule } from 'nestjs-session';
import { RedisService } from 'nestjs-redis';
import * as session from 'express-session';
import * as ConnectRedis from 'connect-redis';
import { sessionConfig } from '@/config/session';

export const createTestingModule = async (modules: any[]) => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ...modules,
      RedisModule.register(regisConfig),
      MongooseModule.forRoot(MONGO_URI, mongoConfig),
      GraphQLModule.forRoot({
        autoSchemaFile: './schema.gql',
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
    ],
  }).compile();
  return moduleFixture;
};
