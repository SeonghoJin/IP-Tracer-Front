import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from './config/appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = app
    .get(ConfigService)
    .get<ConfigType<typeof AppConfig>>('app');

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(config.port);
}

bootstrap();
