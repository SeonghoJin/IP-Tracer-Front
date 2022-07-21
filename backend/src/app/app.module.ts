import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteGateway } from '../gateway/route.gateway';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { EmailModule } from '../modules/email/email.module';
import { AppConfig } from '../config/appConfig';
import { EmailConfig } from '../config/emailConfig';
import { RedisConfig } from '../config/redisConfig';
import { MysqlConfig } from '../config/mysqlConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpLocationApiConfig } from '../config/api/ip-location-api.config';
import { IpLookupModule } from '../ip-lookup/ip-lookup.module';
import { FeedBackConfig } from '../config/feedback.config';
import { AppLoggerMiddleware } from 'src/middleware/AppLogger.middleware';
import {LookupApiStatusEntity} from "../lookup-api/entities/lookup-api-status.entity";
import {IpLocation} from "../ip-lookup/entities/ip-location.entity";

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
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.production',
      load: [
        AppConfig,
        EmailConfig,
        RedisConfig,
        MysqlConfig,
        IpLocationApiConfig,
        FeedBackConfig,
      ],
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
          entities: [LookupApiStatusEntity, IpLocation],
          synchronize: true,
          logging: true,
        };
      },
    }),
    IpLookupModule,
  ],
  controllers: [AppController],
  providers: [AppService, RouteGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
