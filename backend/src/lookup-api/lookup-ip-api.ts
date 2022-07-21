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
import { IpApiRespondedDto, isIpApiResponse } from './dto/ipapi.responded.dto';
import { LookupApiStatus } from './lookup-api-status';
import { IpApiError } from './error/ipapi-error';
import { LookupApiName } from './lookup-api-name';
import { InjectRepository } from '@nestjs/typeorm';
import { LookupApiStatusEntity } from './entities/lookup-api-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LookupIpApi implements LookupApi {
  apiUriBuilder: (ip: string) => string;
  logger: Logger = new Logger('LOOKUP_API');
  constructor(
    @Inject(IpLocationApiConfig.KEY)
    private readonly apiConfig: ConfigType<typeof IpLocationApiConfig>,
    private readonly httpService: HttpService,
    @InjectRepository(LookupApiStatusEntity)
    private readonly lookupApiStatusRepository: Repository<LookupApiStatusEntity>,
  ) {
    this.apiUriBuilder = this.apiConfig.ip_api;
  }

  async canLookup() {
    return (
      (
        await this.lookupApiStatusRepository.findOne({
          where: { apiName: LookupApiName.ipApi },
        })
      ).status === LookupApiStatus.OK
    );
  }

  async lookup(ip: string): Promise<IpLocationResponseDto> {
    this.logger.log(`start with ${ip}`);
    return await firstValueFrom(
      this.httpService.get<IpApiRespondedDto>(this.apiUriBuilder(ip)).pipe(
        map(async (response) => {
          if (!isIpApiResponse(response.data)) {
            throw new InternalServerErrorException();
          }

          const { ip, longitude, latitude } = response.data;

          if (response.status === 200) {
            return IpLocationResponseDto.to(
              ip,
              latitude,
              longitude,
              LookupApiName.ipApi,
            );
          }

          if (response.status === IpApiError.USAGE_LIMIT_REACHED_STATUS) {
            await this.setUsageExceedStatus.call(this);
          }

          const errorMsg = IpApiError[response.status];
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
        apiName: LookupApiName.ipApi,
      },
      { status: LookupApiStatus.ERROR },
    );
  }

  async setUsageExceedStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.ipApi,
      },
      { status: LookupApiStatus.USAGE_EXCEED },
    );
  }

  async setOkStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.ipApi,
      },
      {
        status: LookupApiStatus.OK,
      },
    );
  }
}
