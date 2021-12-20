import { IpLocationResponseDto } from '../dto/ip-location.response.dto';

export interface LookupApi {
  canLookup();
  lookup(ip: string): Promise<IpLocationResponseDto>;
  setErrorStatus();
  setUsageExceedStatus();
  setOkStatus();
}
