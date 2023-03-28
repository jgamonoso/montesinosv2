import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpParametersInterface {
  url: string;
  params?: HttpParams;
  body?: object;
  headers?: {};
}
