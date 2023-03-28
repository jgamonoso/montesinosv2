import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpParametersClass } from './http-parameters.class';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpService {

  private lang: any;

  constructor(
    private readonly http: HttpClient,
    private readonly translate: TranslateService,
    private readonly router: Router
  ) {
    this.lang = this.translate.currentLang ? this.translate.currentLang : 'es';
  }

  get(httpParametersClass: HttpParametersClass): Observable<any> {
    debugger;
    return this.http
      .get(this.setUrl(httpParametersClass), {
        params: httpParametersClass.params,
        headers: this.setHeader(httpParametersClass)
      })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.handleError(response)
        )
      );
  }

  post(httpParametersClass: HttpParametersClass): Observable<any> {
    debugger;
    return this.http
      .post(this.setUrl(httpParametersClass), httpParametersClass.body, {
        params: httpParametersClass.params,
        headers: this.setHeader(httpParametersClass)
      })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.handleError(response)
        )
      );
  }

  private setUrl(httpParametersClass: HttpParametersClass): string {
    debugger;
    return encodeURI(httpParametersClass.url);
  }

  private setHeader(httpParametersClass: HttpParametersClass): HttpHeaders {
    debugger;
    const hhttpParametersClass: HttpParametersClass = this.ifParamsHeader(
      httpParametersClass
    );
    return new HttpHeaders(hhttpParametersClass.headers);
  }

  private ifParamsHeader(httpParametersClass: HttpParametersClass): HttpParametersClass {
    debugger;
    if (!httpParametersClass.headers) {
      httpParametersClass.headers = {
        'accept-language': this.lang
      };
    }
    httpParametersClass.headers = {
      ...httpParametersClass.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': `X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method`,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'accept-language': this.lang
    };
    return httpParametersClass;
  }

  private handleError(error: HttpErrorResponse): Observable<any>  {
    debugger;
    let throwErrorValue = true;
    if (error.status === 400 || error.status === 0) {
      if (error.statusText === 'Unknown Error') {
        this.router.navigate(['auth/login']);
      }
    } else if (error.status === 401 && (error.error?.error_description === 'The access token expired' || error.error?.error === 'invalid_token')) {
      const _remember: boolean = !!JSON.parse(sessionStorage.getItem('CFV'));
      const _currentPath: string = this.router.url;
    } else if (error.status === 403) {
      this.router.navigate(['auth/login']);
    }
    if (throwErrorValue) {
      return throwError(error);
    }
  }
}
