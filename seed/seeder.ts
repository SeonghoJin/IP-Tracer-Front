import { Connection } from 'typeorm';

export interface Seeder {
  load(dbConnection: Connection): Promise<any>;
}
