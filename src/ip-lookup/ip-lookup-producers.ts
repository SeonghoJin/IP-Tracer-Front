import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { constants } from './constants';
import { Job, Queue } from 'bull';
import { Address4 } from 'ip-address';

export class IpLookupProducers {
  constructor(@InjectQueue(constants.ipLookup) private lookUpQueue: Queue) {}

  async addFindLocationJob(address: Address4) {
    const job = await this.lookUpQueue.add(address);
    return job.id;
  }
}
