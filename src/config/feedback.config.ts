import { registerAs } from '@nestjs/config';

export const FeedBackConfig = registerAs('feedback', () => ({
  sender: process.env.SENDER,
  receiver: process.env.RECEIVER,
}));
