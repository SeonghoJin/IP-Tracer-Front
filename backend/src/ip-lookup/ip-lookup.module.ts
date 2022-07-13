import { Module } from '@nestjs/common';
import { IpLookupController } from './ip-lookup.controller';
import { IpLookupService } from './ip-lookup.service';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../config/api/ip-location-api.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupApiModule } from '../lookup-api/lookup-api.module';
import { IpLocation } from './entities/ip-location.entity';
import { LookupApiStatusEntity } from './entities/lookup-api-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LookupApiStatusEntity, IpLocation]),
    ConfigModule.forFeature(IpLocationApiConfig),
    LookupApiModule,
  ],
  controllers: [IpLookupController],
  providers: [IpLookupService],
})
export class IpLookupModule {}
