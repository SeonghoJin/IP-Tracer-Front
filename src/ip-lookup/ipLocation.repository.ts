import { EntityRepository, Repository } from 'typeorm';
import { IpLocation } from './entities/iplocation.entity';

@EntityRepository(IpLocation)
export class IpLocationRepository extends Repository<IpLocation> {}
