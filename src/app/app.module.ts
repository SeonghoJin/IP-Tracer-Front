import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteGateway } from '../gateway/route.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppConfig } from '../config/app.config';
import { EmailModule } from '../modules/email/email.module';

@Module({
  imports: [
    EmailModule.forRootAsync({
      useFactory: (appConfig: AppConfig) => {
        return {
          port: 3,
          host: 'asd',
          auth: {
            pass: 'asd',
            user: 'asd',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(8080),
      }),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RouteGateway, AppConfig],
})
export class AppModule {}
