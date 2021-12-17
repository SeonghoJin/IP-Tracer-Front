import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteGateway } from '../gateway/route.gateway';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import { EmailModule } from '../modules/email/email.module';
import { AppConfig } from '../config/appConfig';
import { EmailConfig } from '../config/emailConfig';
import { BullModule } from '@nestjs/bull';
import { RedisConfig } from '../config/redisConfig';
import { MysqlConfig } from '../config/mysqlConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { IpLocationApiConfig } from '../config/api/ip-location-api.config';
import { IpLookupModule } from '../ip-lookup/ip-lookup.module';
import { FeedBackConfig } from '../config/feedback.config';

@Module({
  imports: [
    EmailModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config =
          configService.get<ConfigType<typeof EmailConfig>>('email');
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
      load: [
        AppConfig,
        EmailConfig,
        RedisConfig,
        MysqlConfig,
        IpLocationApiConfig,
        FeedBackConfig,
      ],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config =
          configService.get<ConfigType<typeof RedisConfig>>('redis');
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
          configService.get<ConfigType<typeof MysqlConfig>>('mysql');
        return {
          type: 'mysql',
          host: config.host,
          port: config.port,
          username: config.username,
          database: config.database,
          password: config.password,
          entities: [join(__dirname, '../**/*.entity.js')],
          synchronize: true,
        };
      },
    }),
    IpLookupModule,
  ],
  controllers: [AppController],
  providers: [AppService, RouteGateway],
})
export class AppModule {}
