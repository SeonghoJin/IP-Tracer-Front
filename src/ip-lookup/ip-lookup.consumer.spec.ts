import { LookupApiService } from './lookup-api/lookup-api.service';
import { IpLookupConsumer } from './ip-lookup.consumer';
import { Test } from '@nestjs/testing';
import { IpLocationRepository } from './ip-location.repository';
import { IpLocation } from './entities/ip-location.entity';
import { IpLocationResponseDto } from './dto/ip-location.response.dto';
import { Job } from 'bull';
import { async } from 'rxjs';

type MockType<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('ip-lookup-consumer', function () {
  let apiService: MockType<LookupApiService>;
  let repo: MockType<IpLocationRepository>;
  let consumer: IpLookupConsumer;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [IpLookupConsumer],
    })
      .useMocker((token) => {
        if (token === LookupApiService) {
          return {
            findLocation: jest.fn(),
          } as MockType<LookupApiService>;
        }
        if (token === IpLocationRepository) {
          return {
            save: jest.fn(),
            findOne: jest.fn(),
          } as MockType<IpLocationRepository>;
        }
      })
      .compile();

    apiService = moduleRef.get(LookupApiService);
    repo = moduleRef.get(IpLocationRepository);
    consumer = moduleRef.get(IpLookupConsumer);
  });

  it('should be defined', () => {
    expect(apiService).toBeDefined();
    expect(repo).toBeDefined();
    expect(consumer).toBeDefined();
  });

  describe('findLocation()', () => {
    it('실행 후 database에 entity가 있으면, entity를 dto로 변환 후 반환한다.', async () => {
      const entity = new IpLocation();
      entity.ip = '10.10.10.10';
      const dto = IpLocationResponseDto.of(entity);
      repo.findOne.mockImplementationOnce(async () => {
        return entity;
      });
      const processedJob = await consumer.findLocation({
        data: '10.10.10.10',
      } as Job<string>);

      expect(processedJob).toEqual(dto);
    });

    it('실행 후 database에 entity가 없으면, 외부 API를 통해 ipLocation을 알아내고 database에 저장한 뒤 ipLocation을 반환한다. ', async () => {
      let data = null;
      repo.findOne.mockImplementationOnce(async () => {
        return undefined;
      });

      repo.save.mockImplementationOnce(async (savedItem: IpLocation) => {
        data = savedItem;
      });

      apiService.findLocation.mockImplementationOnce(async () => {
        return {
          ip: '10',
          latitude: 0,
          longitude: 0,
        } as IpLocationResponseDto;
      });

      const location = await consumer.findLocation({ data: '10' } as Job);
      expect(IpLocationResponseDto.toEntity(location)).toEqual(data);
    });
  });
});
