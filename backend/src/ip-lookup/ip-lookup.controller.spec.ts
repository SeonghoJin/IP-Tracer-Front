import { IpLookupService } from './ip-lookup.service';
import { Test } from '@nestjs/testing';
import { IpLookupController } from './ip-lookup.controller';
import { HttpStatus } from '@nestjs/common';

type MockType<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('ip-lookup-controller', () => {
  let ipLookupService: MockType<IpLookupService>;
  let ipLookupController: IpLookupController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [IpLookupController],
    })
      .useMocker((token) => {
        if (token === IpLookupService) {
          return {
            getLocationByJobId: jest.fn(),
            createFindLocationJob: jest.fn(),
          } as MockType<IpLookupService>;
        }
      })
      .compile();

    ipLookupController = moduleRef.get(IpLookupController);
    ipLookupService = moduleRef.get(IpLookupService);
  });

  it('should be defined', () => {
    expect(ipLookupService).toBeDefined();
    expect(ipLookupController).toBeDefined();
  });
  describe('findLocation', () => {
    it('성공시 JobId를 반환한다. ', async () => {
      ipLookupService.createFindLocationJob.mockImplementationOnce(async () => {
        return '1';
      });

      const jobId = await ipLookupController.findLocation('10.10.10.10');
      expect(jobId).toEqual('1');
    });
  });

  describe('getLocation', () => {
    it('성공시 Job을 반환한다. ', async () => {
      const job = {
        data: 'test',
      };

      ipLookupService.getLocationByJobId.mockImplementationOnce(
        async (id: string) => {
          if (id === '1') {
            return job;
          }
          return null;
        },
      );

      const response = await ipLookupController.getLocation('1');
      expect(response).toEqual(job);
    });

    it('실패시 HttpStatus.ACCEPTED를 반환한다.', async () => {
      ipLookupService.getLocationByJobId.mockImplementationOnce(
        async (id: string) => {
          if (id === '1') {
            return {
              data: 'test',
            };
          }
          return null;
        },
      );

      const response = await ipLookupController.getLocation('2');
      expect(response).toEqual({
        statusCode: HttpStatus.ACCEPTED,
      });
    });
  });
});
