import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, delay, finalize } from 'rxjs/operators';
import { HttpParametersClass } from './http-parameters.class';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../loading.module/service/loading.service';

@Injectable()
export class HttpService {

  private lang: any;

  constructor(
    private readonly http: HttpClient,
    private readonly translate: TranslateService,
    private readonly loadingService: LoadingService
  ) {
    this.lang = this.translate.currentLang ? this.translate.currentLang : 'es';
  }

  get(httpParametersClass: HttpParametersClass): Observable<any> {
    return this.http
      .get(httpParametersClass.url, {
        params: httpParametersClass.params,
        headers: this.setHeader(httpParametersClass)
      })
      .pipe(
        // delay(10000),
        catchError((response: HttpErrorResponse) =>
          this.handleError(response)
        ),
        finalize(() => {
        })
      );
  }

  post(httpParametersClass: HttpParametersClass): Observable<any> {
    return this.http
      .post(httpParametersClass.url, httpParametersClass.body, {
        params: httpParametersClass.params,
        headers: this.setHeader(httpParametersClass)
      })
      .pipe(
        // delay(10000),
        catchError((response: HttpErrorResponse) =>
          this.handleError(response)
        ),
        finalize(() => {
        })
      );
  }

  private setHeader(httpParametersClass: HttpParametersClass): HttpHeaders {
    const hhttpParametersClass: HttpParametersClass = this.ifParamsHeader(
      httpParametersClass
    );
    return new HttpHeaders(hhttpParametersClass.headers);
  }

  private ifParamsHeader(httpParametersClass: HttpParametersClass): HttpParametersClass {
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
    let throwErrorValue = true;
    if (error.status === 400 || error.status === 0) {
    } else if (error.status === 401) {
    } else if (error.status === 403) {
      // this.router.navigate(['auth/login']);
    } else if (error.status === 404) {
    }
    if (throwErrorValue) {
      return throwError(error);
    }
  }
}
