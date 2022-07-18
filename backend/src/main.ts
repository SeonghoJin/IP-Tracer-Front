import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from './config/appConfig';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('IP-Trace Study API Docs')
    .setDescription('IP-Trace Study API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = app
    .get(ConfigService)
    .get<ConfigType<typeof AppConfig>>('app');

  setupSwagger(app);

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(config.port);
}

bootstrap();
