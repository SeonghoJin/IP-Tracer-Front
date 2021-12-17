import { EntityRepository, Repository } from 'typeorm';
import { IpLocation } from './entities/ip-location.entity';

@EntityRepository(IpLocation)
export class IpLocationRepository extends Repository<IpLocation> {}
