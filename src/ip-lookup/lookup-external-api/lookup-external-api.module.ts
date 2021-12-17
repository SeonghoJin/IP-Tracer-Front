import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
import { LookupExternalApiService } from './lookup-external-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forFeature(IpLocationApiConfig), HttpModule],
  providers: [LookupExternalApiService],
  exports: [LookupExternalApiService],
})
export class LookupExternalApiModule {}
