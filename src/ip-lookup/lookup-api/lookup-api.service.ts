import { Inject, Injectable } from '@nestjs/common';
import { IpLocationApiConfig } from '../../config/api/ip-location-api.config';
import { HttpService } from '@nestjs/axios';
import { LookupGeolocationApi } from './lookup-geolocation-api';
import { LookupIpApi } from './lookup-ip-api';
import { LookupStackApi } from './lookup-stack-api';
import { LookupApi } from './lookup-api';

@Injectable()
export class LookupApiService {
  private readonly findLocationIterator: Generator<LookupApi, null, unknown>;
  constructor(
    @Inject(IpLocationApiConfig.KEY)
    private readonly httpService: HttpService,
    private readonly lookupGeolocationApi: LookupGeolocationApi,
    private readonly lookupIpApi: LookupIpApi,
    private readonly lookupStackApi: LookupStackApi,
  ) {
    this.findLocationIterator = this.findLocationGenerator();
  }

  private *findLocationGenerator() {
    while (true) {
      yield this.lookupGeolocationApi;
      yield this.lookupIpApi;
      yield this.lookupStackApi;
    }

    return null;
  }

  async findLocation(ip: string) {
    const { value: lookupApi } = this.findLocationIterator.next();

    if (!lookupApi.canLookup()) {
      throw new Error('Not Execute Api');
    }

    return await lookupApi.lookup(ip);
  }
}
