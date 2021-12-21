import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LookupApi } from './lookup-api';
import { IpLocationResponseDto } from '../dto/ip-location.response.dto';
import { firstValueFrom, map, Observable } from 'rxjs';
import { IpApiRespondedDto } from './dto/ipapi.responded.dto';
import { LookupApiStatus } from './lookup-api-status';
import { LookupApiStatusRepository } from './lookup-api-status.repository';
import { IpApiError } from './error/ipapi-error';
import { LookupApiName } from './lookup-api-name';
import { InjectRepository } from '@nestjs/typeorm';
import { LookupApiStatusEntity } from './entities/lookup-api-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LookupIpApi implements LookupApi {
  apiUriBuilder: (ip: string) => string;
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
      await this.lookupApiStatusRepository.findOne({
        apiName: LookupApiName.ipApi,
      })
    ).status;
  }

  async lookup(ip: string): Promise<IpLocationResponseDto> {
    return await firstValueFrom(
      this.httpService.get<IpApiRespondedDto>(this.apiUriBuilder(ip)).pipe(
        map((response) => {
          const { ip, longitude, latitude } = response.data;

          if (response.status !== 200) {
            const errorMsg = IpApiError[response.status];

            if (errorMsg === undefined) {
              throw new InternalServerErrorException(response.status);
            }

            throw new BadRequestException(errorMsg);
          }

          return IpLocationResponseDto.to(ip, latitude, longitude);
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
