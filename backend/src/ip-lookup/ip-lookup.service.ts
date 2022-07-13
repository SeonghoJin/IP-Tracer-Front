import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IpLocationResponseDto } from './dto/ip-location.response.dto';
import { Repository } from 'typeorm';
import { LookupApiStatusEntity } from './entities/lookup-api-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LookupApiName } from '../lookup-api/lookup-api-name';
import { LookupApiService } from '../lookup-api/lookup-api.service';
import { IpLocation } from './entities/ip-location.entity';

@Injectable()
export class IpLookupService {
  constructor(
    @InjectRepository(LookupApiStatusEntity)
    private readonly lookupApiStatusRepository: Repository<LookupApiStatusEntity>,
    @InjectRepository(IpLocation)
    private readonly ipLocationRepository: Repository<IpLocation>,
    private readonly externalApiService: LookupApiService,
  ) {}

  async getLocation(ip: string) {
    const ipLocationEntity = await this.ipLocationRepository.findOne({
      ip,
    });

    if (ipLocationEntity) {
      return IpLocationResponseDto.of(ipLocationEntity);
    }

    const ipLocation = await this.findLocationByExternalApi(ip);

    if (!ipLocation) {
      throw new BadRequestException(
        'not found iplocationResponse by external api',
      );
    }

    await this.ipLocationRepository.save(
      IpLocationResponseDto.toEntity(ipLocation),
    );

    return ipLocation;
  }

  private findLocationByExternalApi = async (
    ip: string,
  ): Promise<IpLocationResponseDto> => {
    const ipLocation = await this.externalApiService.findLocation(ip);
    return ipLocation;
  };

  async getApiHealths() {
    const apiStatusEntities = await this.lookupApiStatusRepository.find();
    return apiStatusEntities;
  }

  async getApiHealth(apiName: string) {
    if (
      LookupApiName.ipApi === apiName ||
      LookupApiName.geolocationApi === apiName ||
      LookupApiName.stackApi === apiName
    ) {
      const status = await this.lookupApiStatusRepository.findOne({
        where: {
          apiName,
        },
      });

      if (!status) {
        throw new InternalServerErrorException();
      }

      return status;
    }

    throw new BadRequestException();
  }
}
