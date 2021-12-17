import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { event, queue } from './constants';
import { Queue } from 'bull';
import { IpLocationResponseDto } from './dto/ip-location.response.dto';

@Injectable()
export class IpLookupService {
  constructor(
    @InjectQueue(queue.IP_LOOK_UP)
    private readonly lookupQueue: Queue<IpLocationResponseDto | string>,
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
