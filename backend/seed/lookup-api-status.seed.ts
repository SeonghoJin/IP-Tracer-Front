import { Seeder } from './seeder';
import { Connection } from 'typeorm';
import { LookupApiStatus } from '../src/lookup-api/lookup-api-status';
import { LookupApiStatusEntity } from '../src/ip-lookup/entities/lookup-api-status.entity';
import { LookupApiName } from '../src/lookup-api/lookup-api-name';

export class LookupApiStatusSeed implements Seeder {
  async load(dbConnection: Connection): Promise<any> {
    await Promise.all([
      dbConnection
        .createQueryBuilder()
        .insert()
        .into(LookupApiStatusEntity)
        .values({
          apiName: LookupApiName.ipApi,
          status: LookupApiStatus.OK,
        })
        .execute(),
      dbConnection
        .createQueryBuilder()
        .insert()
        .into(LookupApiStatusEntity)
        .values({
          apiName: LookupApiName.stackApi,
          status: LookupApiStatus.OK,
        })
        .execute(),
      dbConnection
        .createQueryBuilder()
        .insert()
        .into(LookupApiStatusEntity)
        .values({
          apiName: LookupApiName.geolocationApi,
          status: LookupApiStatus.OK,
        })
        .execute(),
    ]);
  }
}
