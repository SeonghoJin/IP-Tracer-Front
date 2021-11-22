import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfig);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(configService.port);
}

bootstrap();
