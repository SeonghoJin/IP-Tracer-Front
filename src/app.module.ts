import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteGateway } from './route.gateway';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RouteGateway],
})
export class AppModule {}
