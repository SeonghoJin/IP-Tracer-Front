import { registerAs } from '@nestjs/config';
import { api } from './api';

export const IpLocationApiConfig = registerAs('ipLocationApi', () => ({
  ip_stack_api_key: process.env.IP_STACK_API_KEY,
  ip_stack_api_uri: process.env.IP_STACK_API_BASE_URI,
  ip_stack_api: api.ipStackApi(process.env.IP_STACK_API_BASE_URI)(
    process.env.IP_STACK_API_KEY,
  ),
  ip_api_key: process.env.IP_API_KEY,
  ip_api_uri: process.env.IP_API_BASE_URI,
  ip_api: api.ipApi(process.env.IP_API_BASE_URI)(process.env.IP_API_KEY),
  whois_api_key: process.env.WHOIS_API_KEY,
  ip_geolocation_api_key: process.env.IP_GEOLOCATION_API_KEY,
  ip_geolocation_api_uri: process.env.IP_GEOLOCATION_API_BASE_URI,
  ip_geolocation_api: api.ipGeolocationApi(
    process.env.IP_GEOLOCATION_API_BASE_URI,
  )(process.env.IP_GEOLOCATION_API_KEY),
}));
