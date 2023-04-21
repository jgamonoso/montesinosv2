import { VERSION } from './version';

export const environment = {
  production: true,
  version: VERSION.version,
  gitHash: VERSION.hash,
  API_URL: '/v2api/',
  BASE_HREF: '/v2/',
  langArray: ['es', 'en'],
  langDefault: 'es',
};
