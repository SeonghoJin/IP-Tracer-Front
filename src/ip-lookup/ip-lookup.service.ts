import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IpLocationRepository } from './ipLocation.repository';
import { IpLocation } from './entities/iplocation.entity';
import { InjectQueue } from '@nestjs/bull';
import { event, queue } from './constants';
import { Queue } from 'bull';

@Injectable()
export class IpLookupService {
  constructor(
    private readonly ipLocationRepository: IpLocationRepository,
    @InjectQueue(queue.IP_LOOK_UP)
    private readonly lookupQueue: Queue<IpLocation | string>,
  ) {}

  async getLocationByJobId(jobId: string | number) {
    const job = await this.lookupQueue.getJob(jobId);

    if (!job) {
      throw new BadRequestException();
    }

    if (await job.isFailed()) {
      throw new InternalServerErrorException();
    }

    if (await job.isCompleted()) {
      return job;
    }

    return null;
  }

  async createFindLocationJob(ip: string) {
    const { id } = await this.lookupQueue.add(event.FIND_LOCATION, ip);
    return id;
  }
}
