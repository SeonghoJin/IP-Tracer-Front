export interface IpStackRespondedDto {
  ip: string;
  latitude: number;
  longitude: number;
}

export function isIpStackResponse(
  dto: IpStackRespondedDto,
): dto is IpStackRespondedDto {
  if (!dto) {
    return false;
  }
  if (!dto.ip) {
    return false;
  }
  if (!dto.latitude) {
    return false;
  }
  if (!dto.longitude) {
    return false;
  }
  if (typeof dto.ip !== 'string') {
    return false;
  }
  if (typeof dto.longitude !== 'number') {
    return false;
  }
  if (typeof dto.latitude !== 'number') {
    return false;
  }
  return true;
}
