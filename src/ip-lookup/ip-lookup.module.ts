import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { queue } from './constants';
import { IpLookupConsumer } from './ip-lookup.consumer';
import { IpLookupController } from './ip-lookup.controller';
import { IpLookupService } from './ip-lookup.service';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../config/ip-location-api.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpLocationRepository } from './ipLocation.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: queue.IP_LOOK_UP,
    }),
    ConfigModule.forFeature(IpLocationApiConfig),
    TypeOrmModule.forFeature([IpLocationRepository]),
  ],
  controllers: [IpLookupController],
  providers: [IpLookupConsumer, IpLookupService],
})
export class IpLookupModule {}
