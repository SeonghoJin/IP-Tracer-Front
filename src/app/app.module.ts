import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteGateway } from '../gateway/route.gateway';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import { EmailModule } from '../modules/email/email.module';
import { appConfig } from '../config/app.config';
import { emailConfig } from '../config/email.config';
import { BullModule } from '@nestjs/bull';
import { redisConfig } from '../config/redis.config';
import { mysqlConfig } from '../config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    EmailModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config =
          configService.get<ConfigType<typeof emailConfig>>('email');
        return {
          port: config.port,
          host: config.host,
          auth: {
            pass: config.password,
            user: config.user,
          },
          service: config.service,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(5000),
      }),
      load: [appConfig, emailConfig, redisConfig, mysqlConfig],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config =
          configService.get<ConfigType<typeof redisConfig>>('redis');
        return {
          redis: {
            port: config.port,
            host: config.host,
          },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config =
          configService.get<ConfigType<typeof mysqlConfig>>('mysql');
        return {
          type: 'mysql',
          host: config.host,
          port: config.port,
          username: config.username,
          database: config.database,
          password: config.password,
          entities: [join(__dirname, '/**/*.entity.js')],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RouteGateway],
})
export class AppModule {}
