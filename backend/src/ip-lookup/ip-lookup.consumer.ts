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
import { IpLocationResponseDto } from './dto/ip-location.response.dto';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IpLocation } from './entities/ip-location.entity';
import { Repository } from 'typeorm';

@Processor(queue.IP_LOOK_UP)
export class IpLookupConsumer {
  private readonly logger: Logger = new Logger();

  constructor(
    private readonly externalApiService: LookupApiService,
    @InjectRepository(IpLocation)
    private readonly ipLocationRepository: Repository<IpLocation>,
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

    const ipLocation = await this.findLocationByExternalApi.call(this, ip);
    return ipLocation;
  }

  private async findLocationByExternalApi(
    ip: string,
  ): Promise<IpLocationResponseDto> {
    const ipLocation = await this.externalApiService.findLocation(ip);

    await this.ipLocationRepository.save(
      IpLocationResponseDto.toEntity(ipLocation),
    );
    return ipLocation;
  }

  @OnQueueActive()
  async onActive(job: Job) {
    Logger.log(`Active ${job.id}`);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    Logger.log(`Complete ${job.id} ${job.data}`);
  }

  @OnQueueError()
  async onError(job: Job) {
    Logger.error(`Error ${job.id}`);
  }

  @OnQueueFailed()
  async onFailed(job: Job) {
    Logger.error(`Failed ${job.id} ${job.failedReason}`);
  }
}
