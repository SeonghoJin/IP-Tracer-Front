export interface IpGeolocationRespondedDto {
  ip: string;
  latitude: string;
  longitude: string;
}

export function isGeolocationResponse(
  dto: IpGeolocationRespondedDto,
): dto is IpGeolocationRespondedDto {
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
  if (typeof dto.longitude !== 'string') {
    return false;
  }
  if (typeof dto.latitude !== 'string') {
    return false;
  }
  return true;
}
