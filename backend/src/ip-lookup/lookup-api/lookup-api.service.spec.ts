import { LookupGeolocationApi } from './lookup-geolocation-api';
import { LookupIpApi } from './lookup-ip-api';
import { LookupStackApi } from './lookup-stack-api';
import { Test } from '@nestjs/testing';
import { LookupApiService } from './lookup-api.service';
import { LookupApi } from './lookup-api';
import { IpLocationResponseDto } from '../dto/ip-location.response.dto';
import { CanNotExecuteAPIException } from './error/CanNotExecuteAPIException';
import { Logger } from '@nestjs/common';

type MockType<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('lookup-api-service', () => {
  const logger: Logger = new Logger();
  let lookupGeolocationApi: MockType<LookupApi>;
  let lookupIpApi: MockType<LookupApi>;
  let lookupStackApi: MockType<LookupApi>;
  let lookupApiService: LookupApiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LookupApiService],
    })
      .useMocker((token) => {
        return {
          canLookup: jest.fn(),
          lookup: jest.fn(),
        } as MockType<LookupApi>;
      })
      .compile();

    lookupGeolocationApi = moduleRef.get(LookupGeolocationApi);
    lookupIpApi = moduleRef.get(LookupIpApi);
    lookupStackApi = moduleRef.get(LookupStackApi);
    lookupApiService = moduleRef.get(LookupApiService);
  });

  it('should be defined', () => {
    expect(lookupGeolocationApi).toBeDefined();
    expect(lookupIpApi).toBeDefined();
    expect(lookupStackApi).toBeDefined();
    expect(lookupApiService).toBeDefined();
  });

  describe('findLocation()', () => {
    it('첫번째 findLocation은 lookupGeolocationApi가 실행되고, 성공 시 IpLocationResponseDto를 반환한다.', async () => {
      lookupGeolocationApi.canLookup.mockImplementationOnce(async () => {
        return true;
      });
      lookupGeolocationApi.lookup.mockImplementationOnce(async () => {
        return {
          ip: '10.10.10.10',
          latitude: 0,
          longitude: 0,
        } as IpLocationResponseDto;
      });

      const data = await lookupApiService.findLocation('10.10.10.10');
      expect(data).toEqual({
        ip: '10.10.10.10',
        latitude: 0,
        longitude: 0,
      });
    });

    it('첫번째 findLocation은 lookupGeolocationApi가 실행되고, 실패하면 CanNotExecuteAPIException을 반환한다.', async () => {
      lookupGeolocationApi.canLookup.mockImplementationOnce(async () => {
        return false;
      });
      try {
        await lookupApiService.findLocation('10.10.10.10');
      } catch (e) {
        logger.error(e);
        expect(e).toBeInstanceOf(CanNotExecuteAPIException);
      }
    });
    it('두번째 findLocation은 lookupipApi가 실행되고, 성공 시 IpLocationResponseDto를 반환한다.', async () => {
      lookupIpApi.canLookup.mockImplementation(async () => {
        return true;
      });
      lookupIpApi.lookup.mockImplementation(async () => {
        return {
          ip: '10.10.10.10',
          latitude: 0,
          longitude: 0,
        } as IpLocationResponseDto;
      });
      try {
        await lookupApiService.findLocation('test');
      } catch (e) {}
      const data = await lookupApiService.findLocation('10.10.10.10');
      expect(data).toEqual({
        ip: '10.10.10.10',
        latitude: 0,
        longitude: 0,
      });
    });
    it('두번째 findLocation은 lookupipApi가 실행되고, 실패하면 CanNotExecuteAPIException을 반환한다.', async () => {
      lookupIpApi.canLookup.mockImplementationOnce(async () => {
        return false;
      });
      try {
        await lookupApiService.findLocation('test');
      } catch (e) {}
      try {
        await lookupApiService.findLocation('10.10.10.10');
      } catch (e) {
        logger.error(e);
        expect(e).toBeInstanceOf(CanNotExecuteAPIException);
      }
    });
  });
});
