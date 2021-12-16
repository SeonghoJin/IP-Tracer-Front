import { Process, Processor } from '@nestjs/bull';
import { constants } from './constants';
import { Job } from 'bull';
import { Address4 } from 'ip-address';

@Processor(constants.IP_LOOK_UP)
export class IpLookupHandler {
  @Process()
  async lookup(job: Job<Address4>) {
    const address = job.data;
    console.log(address);
    return job;
  }
}
