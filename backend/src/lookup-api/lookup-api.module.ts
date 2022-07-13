import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../config/api/ip-location-api.config';
import { LookupApiService } from './lookup-api.service';
import { HttpModule } from '@nestjs/axios';
import { LookupIpApi } from './lookup-ip-api';
import { LookupGeolocationApi } from './lookup-geolocation-api';
import { LookupStackApi } from './lookup-stack-api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupApiStatusEntity } from '../ip-lookup/entities/lookup-api-status.entity';

@Module({
  imports: [
    ConfigModule.forFeature(IpLocationApiConfig),
    HttpModule,
    TypeOrmModule.forFeature([LookupApiStatusEntity]),
  ],
  providers: [
    LookupApiService,
    LookupIpApi,
    LookupGeolocationApi,
    LookupStackApi,
  ],
  exports: [LookupApiService],
})
export class LookupApiModule {}
