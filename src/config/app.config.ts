import { registerAs } from '@nestjs/config';

export type AppConfig = {
  port: string;
};

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT,
}));
