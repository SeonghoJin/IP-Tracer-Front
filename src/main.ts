import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const appConfig = app.get();
  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(8080);
}

bootstrap();
