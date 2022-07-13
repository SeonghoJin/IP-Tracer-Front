import { IpLocation } from '../entities/ip-location.entity';

export class IpLocationResponseDto {
  ip: string;
  latitude: number;
  longitude: number;
  apiName: string;

  public static of(ipLocation: IpLocation): IpLocationResponseDto {
    const dto = new IpLocationResponseDto();
    const { ip, longitude, latitude } = ipLocation;

    dto.ip = ip;
    dto.longitude = longitude;
    dto.latitude = latitude;

    return dto;
  }

  public static to(
    ip: string,
    latitude: number,
    longitude: number,
    apiName: string,
  ): IpLocationResponseDto {
    const dto = new IpLocationResponseDto();

    dto.ip = ip;
    dto.latitude = latitude;
    dto.longitude = longitude;
    dto.apiName = apiName;

    return dto;
  }

  public static toEntity(dto: IpLocationResponseDto): IpLocation {
    const ipLocation = new IpLocation();
    ipLocation.ip = dto.ip;
    ipLocation.latitude = dto.latitude;
    ipLocation.longitude = dto.longitude;
    ipLocation.apiName = dto.apiName;
    return ipLocation;
  }
}
