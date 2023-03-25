import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpParametersClass } from './http-parameters.class';
import { JwtService } from 'src/core/module/auth.module/service/jwt.service';
import { API_ENDPOINTS, API_ENTITIES } from 'src/core/services/api/api-settings';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

export const _API_ENDPOINTS: any = { ...API_ENDPOINTS };
export const _API_ENTITIES: Array<any> = [...API_ENTITIES ];
@Injectable()
export class HttpService {

  private lang: any;

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly translate: TranslateService,
    private readonly router: Router
  ) {
    this.lang = this.translate.currentLang ? this.translate.currentLang : 'es';
  }

  pdf(httpParametersClass: HttpParametersClass): Observable<any> {
    return this.http
      .post(this.setUrl(httpParametersClass), httpParametersClass.body, {
        responseType: 'blob',
        params: httpParametersClass.params,
        headers: this.setHeader(httpParametersClass)
      })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.handleError(response)
        )
      );
  }

  getExcel(httpParametersClass: HttpParametersClass): Observable<any> {
    return this.http
      .get(this.setUrl(httpParametersClass), {
        responseType: 'blob',
        params: httpParametersClass.params,
        headers: this.setHeader(httpParametersClass)
      })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.handleError(response)
        )
      );
  }

  get(httpParametersClass: HttpParametersClass): Observable<any> {
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

  put(httpParametersClass: HttpParametersClass): Observable<any> {
    return this.http
      .put(this.setUrl(httpParametersClass), httpParametersClass.body, {
        params: httpParametersClass.params,
        headers: this.setHeader(httpParametersClass)
      })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.handleError(response)
        )
      );
  }

  delete(httpParametersClass: HttpParametersClass): Observable<any> {
    return this.http
      .delete(this.setUrl(httpParametersClass), {
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
    if (!httpParametersClass.external) {
      return encodeURI(environment.url + httpParametersClass.url);
    } else {
      return encodeURI(httpParametersClass.url);
    }
  }

  private setHeader(httpParametersClass: HttpParametersClass): HttpHeaders {
    const hhttpParametersClass: HttpParametersClass = this.ifParamsHeader(
      httpParametersClass
    );
    return new HttpHeaders(hhttpParametersClass.headers);
  }

  private ifParamsHeader(httpParametersClass: HttpParametersClass): HttpParametersClass {
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
    return this.ifTokenHeader(httpParametersClass);
  }

  private ifTokenHeader(httpParametersClass: HttpParametersClass): HttpParametersClass {
    if (!httpParametersClass.jwt) {
      httpParametersClass.headers.Authorization = environment.authorization;
    } else {
      httpParametersClass.headers.Authorization = `Bearer ${this.jwtService.getOauth().access_token}`;
    }
    return httpParametersClass;
  }

  private handleError(error: HttpErrorResponse): Observable<any>  {
    let throwErrorValue = true;
    if (error.status === 400 || error.status === 0) {
      if (error.statusText === 'Unknown Error') {
        this.router.navigate(['auth/login']);
      }
    } else if (error.status === 401 && (error.error?.error_description === 'The access token expired' || error.error?.error === 'invalid_token')) {
      const _remember: boolean = !!JSON.parse(sessionStorage.getItem('remember'));
      const _currentPath: string = this.router.url;
      if (_remember) {
        throwErrorValue = false;
        this.jwtService.refreshToken().subscribe(() => {
          this.router.navigate([_currentPath]).then(() => {
            if (window) {
              window.location.reload();
            }
          });
        });
      } else {
        this.router.navigate(['auth/login']);
      }
    } else if (error.status === 403) {
      this.router.navigate(['auth/login']);
    }
    if (throwErrorValue) {
      return throwError(error);
    }
  }

}
