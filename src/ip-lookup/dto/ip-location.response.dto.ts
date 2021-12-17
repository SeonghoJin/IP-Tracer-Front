import { IpLocation } from '../entities/ip-location.entity';

export class IpLocationResponseDto {
  private ip: string;
  private latitude: number;
  private longitude: number;

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
  ): IpLocationResponseDto {
    const dto = new IpLocationResponseDto();

    dto.ip = ip;
    dto.latitude = latitude;
    dto.longitude = longitude;

    return dto;
  }

  public toEntity(): IpLocation {
    const ipLocation = new IpLocation();
    ipLocation.ip = this.ip;
    ipLocation.latitude = this.latitude;
    ipLocation.longitude = this.longitude;
    return ipLocation;
  }
}
