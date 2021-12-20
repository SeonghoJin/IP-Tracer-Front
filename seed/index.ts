import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { LookupApiStatusSeed } from './lookup-api-status.seed';
import { LookupApiStatusEntity } from '../src/ip-lookup/lookup-api/entities/lookup-api-status.entity';
dotenv.config();
createConnection({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  port: parseInt(process.env.MYSQL_PORT),
  entities: [LookupApiStatusEntity],
})
  .then(async (connection) => {
    const seeds = [new LookupApiStatusSeed()];

    await Promise.all(
      seeds.map((seed) => {
        return seed.load(connection);
      }),
    );

    await connection.close();
  })
  .then(() => {
    console.log('Seeding Success');
  })
  .catch((e) => {
    console.log('Can not Connect: ', e);
  });
