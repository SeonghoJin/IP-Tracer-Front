import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { event, queue } from './constants';
import { Job } from 'bull';
import { IpLocation } from './entities/iplocation.entity';

@Processor(queue.IP_LOOK_UP)
export class IpLookupConsumer {
  @Process(event.FIND_LOCATION)
  async findLocation(job: Job<IpLocation | string>) {
    return job.id;
  }

  @OnQueueActive()
  async onActive(job: Job) {
    console.log(`Active ${job.id}`);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    console.log(`Complete ${job.id}`);
  }

  @OnQueueError()
  async onError(job: Job) {
    console.log(`Error ${job.id}`);
  }

  @OnQueueFailed()
  async onFailed(job: Job) {
    console.log(`Failed ${job.id} ${job.failedReason}`);
  }
}
