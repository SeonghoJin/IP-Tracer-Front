import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService).get('app') as AppConfig;
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(appConfig.port);
}

bootstrap();
