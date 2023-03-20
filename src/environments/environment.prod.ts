//TODO: Cambiar la url de los servicios en prod

import { VERSION } from './version';

export const environment = {
  production: true,
  version: VERSION.version,
  gitHash: VERSION.hash,
  base_url: 'http://localhost/api/',
  langArray: ['es', 'en'],
  langDefault: 'es',
};
