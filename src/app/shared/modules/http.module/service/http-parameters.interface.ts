import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpParametersInterface {
  url: string;
  external?: boolean;
  params?: HttpParams;
  body?: object;
  headers?: {};
  jwt?: boolean;
}
