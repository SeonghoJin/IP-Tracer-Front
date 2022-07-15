import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IpLocationApiConfig } from '../config/api/ip-location-api.config';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LookupApi } from './lookup-api';
import { IpLocationResponseDto } from '../ip-lookup/dto/ip-location.response.dto';
import { firstValueFrom, map } from 'rxjs';
import {
  IpStackRespondedDto,
  isIpStackResponse,
} from './dto/ipstack.responded.dto';
import { LookupApiStatus } from './lookup-api-status';
import { LookupApiName } from './lookup-api-name';
import { IpStackError } from './error/ipstack-error';
import { InjectRepository } from '@nestjs/typeorm';
import { LookupApiStatusEntity } from '../ip-lookup/entities/lookup-api-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LookupStackApi implements LookupApi {
  logger: Logger = new Logger('STACK_API');
  apiUriBuilder: (ip: string) => string;
  constructor(
    @Inject(IpLocationApiConfig.KEY)
    private readonly apiConfig: ConfigType<typeof IpLocationApiConfig>,
    private readonly httpService: HttpService,
    @InjectRepository(LookupApiStatusEntity)
    private readonly lookupApiStatusRepository: Repository<LookupApiStatusEntity>,
  ) {
    this.apiUriBuilder = this.apiConfig.ip_stack_api;
  }

  async canLookup() {
    return (
      (
        await this.lookupApiStatusRepository.findOne({
          where: { apiName: LookupApiName.stackApi },
        })
      ).status === LookupApiStatus.OK
    );
  }

  async lookup(ip: string): Promise<IpLocationResponseDto> {
    this.logger.log(`start with ${ip}`);
    return await firstValueFrom(
      this.httpService.get<IpStackRespondedDto>(this.apiUriBuilder(ip)).pipe(
        map((response) => {
          if (!isIpStackResponse(response.data)) {
            throw new InternalServerErrorException();
          }

          const { ip, longitude, latitude } = response.data;

          if (response.status === 200) {
            return IpLocationResponseDto.to(
              ip,
              latitude,
              longitude,
              LookupApiName.stackApi,
            );
          }

          if (response.status === IpStackError.USAGE_LIMIT_REACHED_STATUS) {
            this.setUsageExceedStatus.call(this);
          }

          const errorMsg = IpStackError[response.status];

          if (errorMsg) {
            throw new BadRequestException(errorMsg);
          }

          throw new InternalServerErrorException(response.status);
        }),
      ),
    );
  }

  async setErrorStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.stackApi,
      },
      { status: LookupApiStatus.ERROR },
    );
  }

  async setUsageExceedStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.stackApi,
      },
      { status: LookupApiStatus.USAGE_EXCEED },
    );
  }

  async setOkStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.stackApi,
      },
      {
        status: LookupApiStatus.OK,
      },
    );
  }
}
