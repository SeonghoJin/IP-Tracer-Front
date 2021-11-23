import { registerAs } from '@nestjs/config';

export const emailConfig = registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
}));
