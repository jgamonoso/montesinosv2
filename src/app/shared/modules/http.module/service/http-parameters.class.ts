import { HttpParametersInterface } from './http-parameters.interface';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpParametersClass implements HttpParametersInterface {
  url: string;
  external: boolean;
  params?: HttpParams;
  body?: any;
  headers?: any;
  jwt?: boolean;

  constructor(
    p: HttpParametersInterface = {
      url: '',
      external: false,
      params: new HttpParams(),
      body: {},
      headers: {},
      jwt: true
    }
  ) {
    this.url = p.url;
    this.external = p.external ? p.external : this.external;
    this.params = p.params ? p.params : this.params;
    this.body = p.body ? p.body : this.body;
    this.headers = p.headers ? p.headers : this.headers;
    this.jwt = p.jwt ? p.jwt : this.jwt;
  }
}
