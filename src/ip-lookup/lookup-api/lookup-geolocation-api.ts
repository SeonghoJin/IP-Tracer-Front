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
import { IpGeolocationRespondedDto } from './dto/ipgeolocation.responded.dto';
import { LookupApiStatus } from './lookup-api-status';
import { LookupApiStatusRepository } from './lookup-api-status.repository';
import { LookupApiName } from './lookup-api-name';
import { IpGeolocationError } from './error/ipgeolocation-error';

@Injectable()
export class LookupGeolocationApi implements LookupApi {
  apiUriBuilder: (ip: string) => string;
  constructor(
    @Inject(IpLocationApiConfig.KEY)
    private readonly apiConfig: ConfigType<typeof IpLocationApiConfig>,
    private readonly httpService: HttpService,
    private readonly lookupApiStatusRepository: LookupApiStatusRepository,
  ) {
    this.apiUriBuilder = this.apiConfig.ip_geolocation_api;
  }

  async canLookup() {
    return (
      await this.lookupApiStatusRepository.findOne({
        apiName: LookupApiName.geolocationApi,
      })
    ).status;
  }

  async lookup(ip: string): Promise<IpLocationResponseDto> {
    return await firstValueFrom(
      this.httpService
        .get<IpGeolocationRespondedDto>(this.apiUriBuilder(ip))
        .pipe(
          map((response) => {
            const { ip, longitude, latitude } = response.data;
            if (response.status !== 200) {
              const errorMsg = IpGeolocationError[response.status];

              if (errorMsg === undefined) {
                throw new InternalServerErrorException(response.status);
              }

              throw new BadRequestException(errorMsg);
            }

            return IpLocationResponseDto.to(
              ip,
              parseFloat(latitude),
              parseFloat(longitude),
            );
          }),
        ),
    );
  }

  async setErrorStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.geolocationApi,
      },
      { status: LookupApiStatus.ERROR },
    );
  }

  async setUsageExceedStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.geolocationApi,
      },
      { status: LookupApiStatus.USAGE_EXCEED },
    );
  }

  async setOkStatus() {
    await this.lookupApiStatusRepository.update(
      {
        apiName: LookupApiName.geolocationApi,
      },
      {
        status: LookupApiStatus.OK,
      },
    );
  }
}
