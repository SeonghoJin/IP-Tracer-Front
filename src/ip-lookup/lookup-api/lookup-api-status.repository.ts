import { EntityRepository, Repository } from 'typeorm';
import { LookupApiStatusEntity } from './entities/lookup-api-status.entity';

@EntityRepository(LookupApiStatusEntity)
export class LookupApiStatusRepository extends Repository<LookupApiStatusEntity> {}
