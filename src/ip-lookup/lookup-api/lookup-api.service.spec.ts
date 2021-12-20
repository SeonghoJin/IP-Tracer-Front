import { Test, TestingModule } from '@nestjs/testing';
import { LookupApiService } from './lookup-api.service';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom, of } from 'rxjs';
import { IpLocationResponseDto } from '../dto/ip-location.response.dto';
import { AxiosResponse } from 'axios';

describe('LookupExternalApiService', () => {
  let service: LookupApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(IpLocationApiConfig), HttpModule],
      providers: [LookupApiService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<LookupApiService>(LookupApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findLocation', async (done) => {});

  it('findLocationByIpApi', async (done) => {
    const response: AxiosResponse<any> = {
      data: undefined,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
    const data = await firstValueFrom(
      service.findLocationByIpApi('168.131.153.43'),
    );
    expect(data).toBeInstanceOf(IpLocationResponseDto);
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
