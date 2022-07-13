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
  IpGeolocationRespondedDto,
  isGeolocationResponse,
} from './dto/ipgeolocation.responded.dto';
import { LookupApiStatus } from './lookup-api-status';
import { LookupApiName } from './lookup-api-name';
import { IpGeolocationError } from './error/ipgeolocation-error';
import { InjectRepository } from '@nestjs/typeorm';
import { LookupApiStatusEntity } from '../ip-lookup/entities/lookup-api-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LookupGeolocationApi implements LookupApi {
  apiUriBuilder: (ip: string) => string;
  logger = new Logger('GeoLocation_API');
  constructor(
    @Inject(IpLocationApiConfig.KEY)
    private readonly apiConfig: ConfigType<typeof IpLocationApiConfig>,
    private readonly httpService: HttpService,
    @InjectRepository(LookupApiStatusEntity)
    private readonly lookupApiStatusRepository: Repository<LookupApiStatusEntity>,
  ) {
    this.apiUriBuilder = this.apiConfig.ip_geolocation_api;
  }

  async canLookup() {
    return (
      (
        await this.lookupApiStatusRepository.findOne({
          apiName: LookupApiName.geolocationApi,
        })
      ).status === LookupApiStatus.OK
    );
  }

  async lookup(ip: string): Promise<IpLocationResponseDto> {
    this.logger.log(`start with ${ip}`);
    return await firstValueFrom(
      this.httpService
        .get<IpGeolocationRespondedDto>(this.apiUriBuilder(ip))
        .pipe(
          map(async (response) => {
            if (!isGeolocationResponse(response.data)) {
              throw new InternalServerErrorException();
            }
            const { ip, longitude, latitude } = response.data;

            if (response.status === 200) {
              return IpLocationResponseDto.to(
                ip,
                parseFloat(latitude),
                parseFloat(longitude),
                  LookupApiName.geolocationApi
              );
            }

            if (response.status === 429) {
              await this.setUsageExceedStatus.call(this);
            }

            const errorMsg = IpGeolocationError[response.status];
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
