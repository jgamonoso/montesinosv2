// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { VERSION } from './version';

export const environment = {
  production: false,
  version: VERSION.version,
  gitHash: VERSION.hash,
  // Para usar API php
  API_URL: 'http://localhost/api/',
  // Para usar API node.js en desarrollo
  // API_URL: 'http://localhost:3000/api/',
  BASE_HREF: '/',
  langArray: ['es', 'en'],
  langDefault: 'es',
  SECRET_KEY: 'montesinos',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
