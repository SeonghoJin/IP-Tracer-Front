import { ExternalApiHttpError } from './error';

export const IpApiError = {
  101: ExternalApiHttpError.INVALID_ACCESS_KEY,
  102: ExternalApiHttpError.INACTIVE_USER,
  103: ExternalApiHttpError.INVALID_API_FUNCTION,
  104: ExternalApiHttpError.USAGE_LIMIT_REACHED,
  USAGE_LIMIT_REACHED_STATUS: 104,
  105: ExternalApiHttpError.FUNCTION_ACCESS_RESTRICTED,
  301: ExternalApiHttpError.INVALID_FIELDS,
  404: ExternalApiHttpError.NOT_FOUND,
} as const;
