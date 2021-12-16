import { registerAs } from '@nestjs/config';

export const mysqlConfig = registerAs('mysql', () => ({
  port: parseInt(process.env.MYSQL_PORT),
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}));
