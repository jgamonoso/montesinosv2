import { HttpParametersInterface } from './http-parameters.interface';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpParametersClass implements HttpParametersInterface {
  url: string;ç
  params?: HttpParams;
  body?: any;
  headers?: any;

  constructor(
    p: HttpParametersInterface = {
      url: '',
      params: new HttpParams(),
      body: {},
      headers: {}
    }
  ) {
    this.url = p.url;
    this.params = p.params ? p.params : this.params;
    this.body = p.body ? p.body : this.body;
    this.headers = p.headers ? p.headers : this.headers;
  }
}
