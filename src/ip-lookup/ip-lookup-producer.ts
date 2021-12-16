import { InjectQueue } from '@nestjs/bull';
import { constants } from './constants';
import { Queue } from 'bull';
import { Address4 } from 'ip-address';

export class IpLookupProducers {
  constructor(@InjectQueue(constants.IP_LOOK_UP) private lookUpQueue: Queue) {}

  async addFindLocationJob(address: Address4) {
    const job = await this.lookUpQueue.add(address);
    return job.id;
  }
}
