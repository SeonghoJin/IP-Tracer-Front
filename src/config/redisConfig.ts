import { registerAs } from '@nestjs/config';

export const RedisConfig = registerAs('redis', () => ({
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
}));
