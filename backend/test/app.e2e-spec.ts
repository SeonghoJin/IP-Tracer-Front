import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app/app.module';
import { getConnectionOptions, Repository } from 'typeorm';
import { LookupApiStatusEntity } from '../src/ip-lookup/entities/lookup-api-status.entity';
import { IpLocation } from '../src/ip-lookup/entities/ip-location.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('app(e2e)', () => {
  let app: INestApplication;
  let ipLocationRepository: Repository<IpLocation>;
  let apiStatusRepository: Repository<LookupApiStatusEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    ipLocationRepository = app.get(getRepositoryToken(IpLocation));
    apiStatusRepository = app.get(getRepositoryToken(LookupApiStatusEntity));
  });

  it('should be defined', () => {
    // expect(app).toBeDefined();
    // expect(ipLocationRepository).toBeDefined();
    // expect(apiStatusRepository).toBeDefined();
  });

  // describe('/', () => {
  //   it('/user-feedback (POST)', () => {
  //     return request(app.getHttpServer())
  //       .get('/')
  //       .expect(200)
  //       .expect('Hello World!');
  //   });
  // });
  //
  // describe('/ip-lookup', () => {
  //   it('/location (POST)', () => {});
  //   it('/location/:jobId (GET) ', () => {});
  // });

  afterAll(() => {
    app.close();
  });
});
