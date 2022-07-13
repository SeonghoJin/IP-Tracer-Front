import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
}));
