import { ExternalApiHttpError } from './error';

export const IpGeolocationError = {
  401: ExternalApiHttpError.INVALID_ACCESS_KEY,
  404: ExternalApiHttpError.NOT_FOUND,
  429: ExternalApiHttpError.USAGE_LIMIT_REACHED,
  USAGE_LIMIT_REACHED_STATUS: 429,
} as const;
