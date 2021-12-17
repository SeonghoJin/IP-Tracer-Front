import { Test, TestingModule } from '@nestjs/testing';
import { LookupExternalApiService } from './lookup-external-api.service';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
import { HttpModule } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IpLocationResponseDto } from '../dto/ip-location.response.dto';

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

  it('findLocationByIpApi', async (done) => {
    const response = await firstValueFrom(
      service.findLocationByIpApi('168.131.153.43'),
    );
    expect(response).toBeInstanceOf(IpLocationResponseDto);
    done();
  });

  it('findLocationByIpGeolocationApi', async (done) => {
    const response = await firstValueFrom(
      service.findLocationByIpGeolocationApi('168.131.153.43'),
    );
    expect(response).toBeInstanceOf(IpLocationResponseDto);
    done();
  });

  it('findLocationByIpStackApi', async (done) => {
    const response = await firstValueFrom(
      service.findLocationByIpStackApi('168.131.153.43'),
    );
    expect(response).toBeInstanceOf(IpLocationResponseDto);
    done();
  });
});
