import { Test, TestingModule } from '@nestjs/testing';
import { LookupExternalApiService } from './lookup-external-api.service';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
import { HttpModule } from '@nestjs/axios';

describe('LookupExternalApiService', () => {
  let service: LookupExternalApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(IpLocationApiConfig), HttpModule],
      providers: [LookupExternalApiService],
    }).compile();

    service = module.get<LookupExternalApiService>(LookupExternalApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findLocation', () => {});
});
