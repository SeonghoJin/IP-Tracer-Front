import { registerAs } from '@nestjs/config';

export const ipLocationApiConfig = registerAs('ipLocationApi', () => ({
  ip_stack_api_key: process.env.IP_STACK_API_KEY,
  ip_api_key: process.env.IP_API_KEY,
  whois_api_key: process.env.WHOIS_API_KEY,
}));
