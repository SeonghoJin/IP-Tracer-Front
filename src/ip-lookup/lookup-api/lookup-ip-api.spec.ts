import { Test } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
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
import { LookupApiName } from './lookup-api-name';
import { LookupIpApi } from './lookup-ip-api';
import { IpApiError } from './error/ipapi-error';

const mockRepository = {
  findOne: jest.fn(),
  update: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('lookup-ip-api', () => {
  let httpService: HttpService;
  let api: LookupIpApi;
  let lookupApiStatusRepository: MockRepository<LookupApiStatusEntity>;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forFeature(IpLocationApiConfig)],
      providers: [
        LookupIpApi,
        {
          provide: getRepositoryToken(LookupApiStatusEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    httpService = moduleRef.get(HttpService);
    api = moduleRef.get(LookupIpApi);
    lookupApiStatusRepository = moduleRef.get(
      getRepositoryToken(LookupApiStatusEntity),
    );
  });

  it('should be defined', function () {
    expect(httpService).toBeDefined();
    expect(api).toBeDefined();
    expect(lookupApiStatusRepository).toBeDefined();
  });

  describe('canLookup()', () => {
    it('canLookup 함수를 성공한다면 true를 반환한다.', async () => {
      jest
        .spyOn(lookupApiStatusRepository, 'findOne')
        .mockImplementationOnce(async () => {
          const entity = new LookupApiStatusEntity();
          entity.status = LookupApiStatus.OK;
          return entity;
        });

      expect(await api.canLookup()).toBeTruthy();
    });
  });

  describe('lookup()', function () {
    it('api이용해서 lookup하고 성공하면 IpLocationResponseDto를 반환한다.', async () => {
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

      const expectedResult = await api.lookup('255.255.255.255');
      expect(expectedResult.ip).toEqual('255.255.255.255');
      expect(expectedResult.longitude).toEqual(0);
      expect(expectedResult.latitude).toEqual(0);
    });

    it('api이용해서 lookup하고 status가 USAGE_LIMIT_STATUS이면, BadRequest에러를 던진다.', async () => {
      const data = new IpLocationResponseDto();
      const result: AxiosResponse<IpLocationResponseDto> = {
        config: undefined,
        headers: undefined,
        status: IpApiError.USAGE_LIMIT_REACHED_STATUS,
        statusText: 'error',
        data,
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce((ip: string) => {
        const mockObservable = of(result);
        return mockObservable;
      });
      try {
        await api.lookup('255.255.255.255');
      } catch (e) {
        expect(e).toStrictEqual(
          new BadRequestException(
            IpApiError[IpApiError.USAGE_LIMIT_REACHED_STATUS],
          ),
        );
      }
    });

    it('api이용해서 lookup하고 예상되지 않은 에러라면, InternalServerErrorException을 던진다.', async () => {
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
        await api.lookup('255.255.255.255');
      } catch (e) {
        expect(e).toStrictEqual(new InternalServerErrorException(-100));
      }
    });

    it('api이용해서 lookup하고 status가 429라면, Status를 USAGE_EXCEED로 변경한 후 BadRequestException을 던진다.', async () => {
      const data = new IpLocationResponseDto();
      const result: AxiosResponse<IpLocationResponseDto> = {
        config: undefined,
        headers: undefined,
        status: IpApiError.USAGE_LIMIT_REACHED_STATUS,
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
            if (apiName === LookupApiName.ipApi) {
              statusEntity.status = status;
            }
          },
        );

      try {
        await api.lookup('255.255.255.255');
      } catch (e) {
        expect(statusEntity.status).toEqual(LookupApiStatus.USAGE_EXCEED);
        expect(e).toStrictEqual(
          new BadRequestException(
            IpApiError[IpApiError.USAGE_LIMIT_REACHED_STATUS],
          ),
        );
      }
    });
  });
});
