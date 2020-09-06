import { RedisModuleOptions } from 'nestjs-redis';

const REDIS_URI = process.env.REDIS_URI;
export const regisConfig: RedisModuleOptions = {
  url: REDIS_URI,
};
