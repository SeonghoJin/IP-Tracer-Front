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
import { LookupApiService } from './lookup-api/lookup-api.service';
import { IpLocationRepository } from './ip-location.repository';
import { IpLocationResponseDto } from './dto/ip-location.response.dto';
import { Logger } from '@nestjs/common';

@Processor(queue.IP_LOOK_UP)
export class IpLookupConsumer {
  private readonly logger: Logger = new Logger();

  constructor(
    private readonly externalApiService: LookupApiService,
    private readonly ipLocationRepository: IpLocationRepository,
  ) {}

  @Process(event.FIND_LOCATION)
  async findLocation(job: Job<IpLocationResponseDto | string>) {
    const ip = job.data as string;
    const ipLocationEntity = await this.ipLocationRepository.findOne({
      ip,
    });

    if (ipLocationEntity) {
      return IpLocationResponseDto.of(ipLocationEntity);
    }

    const ipLocation = await this.externalApiService.findLocation(ip);
    this.ipLocationRepository.save(ipLocation.toEntity());
    return ipLocation;
  }

  @OnQueueActive()
  async onActive(job: Job) {
    console.log(`Active ${job.id}`);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    console.log(`Complete ${job.id} ${job.data}`);
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
