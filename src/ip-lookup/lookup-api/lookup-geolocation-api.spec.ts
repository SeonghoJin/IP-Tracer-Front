import { Test } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
import { LookupGeolocationApi } from './lookup-geolocation-api';
import { LookupApiStatusEntity } from './entities/lookup-api-status.entity';
import { Repository } from 'typeorm';
import { LookupApiStatus } from './lookup-api-status';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IpLocationResponseDto } from '../dto/ip-location.response.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IpGeolocationError } from './error/ipgeolocation-error';
import { LookupApiName } from './lookup-api-name';

const mockRepository = {
  findOne: jest.fn(),
  update: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('lookup-geolocation-api', () => {
  let httpService: HttpService;
  let lookupGeolocationApi: LookupGeolocationApi;
  let lookupApiStatusRepository: MockRepository<LookupApiStatusEntity>;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forFeature(IpLocationApiConfig)],
      providers: [
        LookupGeolocationApi,
        {
          provide: getRepositoryToken(LookupApiStatusEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    httpService = moduleRef.get(HttpService);
    lookupGeolocationApi = moduleRef.get(LookupGeolocationApi);
    lookupApiStatusRepository = moduleRef.get(
      getRepositoryToken(LookupApiStatusEntity),
    );
  });

  it('should be defined', function () {
    expect(httpService).toBeDefined();
    expect(lookupGeolocationApi).toBeDefined();
    expect(lookupApiStatusRepository).toBeDefined();
  });

  describe('canLookup()', () => {
    it('canLookup 함수를 성공한다면 LookupApiStatus.OK를 던진다.', async () => {
      jest
        .spyOn(lookupApiStatusRepository, 'findOne')
        .mockImplementationOnce(async () => {
          const entity = new LookupApiStatusEntity();
          entity.status = LookupApiStatus.OK;
          return entity;
        });

      expect(await lookupGeolocationApi.canLookup()).toBeTruthy();
    });
  });

  describe('lookup()', function () {
    it('geolocationApi를 이용해서 lookup하고 성공하면 IpLocationResponseDto를 반환한다.', async () => {
      const data = new IpLocationResponseDto();
      data.longitude = 0;
      data.latitude = 0;
      data.ip = '255.255.255.255';
      const result: AxiosResponse<IpLocationResponseDto> = {
        config: undefined,
        headers: undefined,
        status: 200,
        statusText: 'OK',
        data,
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce((ip: string) => {
        const mockObservable = of(result);
        return mockObservable;
      });

      const expectedResult = await lookupGeolocationApi.lookup(
        '255.255.255.255',
      );
      expect(expectedResult.ip).toEqual('255.255.255.255');
      expect(expectedResult.longitude).toEqual(0);
      expect(expectedResult.latitude).toEqual(0);
    });

    it('geolocationApi를 이용해서 lookup하고 status가 401이면, BadRequest에러를 던진다.', async () => {
      const data = new IpLocationResponseDto();
      const result: AxiosResponse<IpLocationResponseDto> = {
        config: undefined,
        headers: undefined,
        status: 401,
        statusText: 'error',
        data,
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce((ip: string) => {
        const mockObservable = of(result);
        return mockObservable;
      });
      try {
        await lookupGeolocationApi.lookup('255.255.255.255');
      } catch (e) {
        expect(e).toStrictEqual(
          new BadRequestException(IpGeolocationError[401]),
        );
      }
    });

    it('geolocationApi를 이용해서 lookup하고 예상되지 않은 에러라면, InternalServerErrorException을 던진다.', async () => {
      const data = new IpLocationResponseDto();
      const result: AxiosResponse<IpLocationResponseDto> = {
        config: undefined,
        headers: undefined,
        status: -100,
        statusText: 'error',
        data,
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce((ip: string) => {
        const mockObservable = of(result);
        return mockObservable;
      });
      try {
        await lookupGeolocationApi.lookup('255.255.255.255');
      } catch (e) {
        expect(e).toStrictEqual(new InternalServerErrorException(-100));
      }
    });

    it('geolocationApi를 이용해서 lookup하고 status가 429라면, Status를 USAGE_EXCEED로 변경한 후 BadRequestException을 던진다.', async () => {
      const data = new IpLocationResponseDto();
      const result: AxiosResponse<IpLocationResponseDto> = {
        config: undefined,
        headers: undefined,
        status: 429,
        statusText: 'EXCEED',
        data,
      };
      const statusEntity = new LookupApiStatusEntity();
      statusEntity.status = LookupApiStatus.OK;

      jest.spyOn(httpService, 'get').mockImplementationOnce((ip: string) => {
        const mockObservable = of(result);
        return mockObservable;
      });

      jest
        .spyOn(lookupApiStatusRepository, 'update')
        .mockImplementationOnce(
          async (
            { apiName }: { apiName: LookupApiName },
            { status }: { status: LookupApiStatus },
          ) => {
            if (apiName === LookupApiName.geolocationApi) {
              statusEntity.status = status;
            }
          },
        );

      try {
        await lookupGeolocationApi.lookup('255.255.255.255');
      } catch (e) {
        expect(statusEntity.status).toEqual(LookupApiStatus.USAGE_EXCEED);
        expect(e).toStrictEqual(
          new BadRequestException(IpGeolocationError[429]),
        );
      }
    });
  });
});
