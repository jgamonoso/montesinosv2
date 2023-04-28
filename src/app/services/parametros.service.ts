import { Injectable } from '@angular/core';
import { HttpService } from '../shared/modules/http.module/service/http.service';
import { LoadingService } from '../shared/modules/loading.module/service/loading.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpParametersClass } from '../shared/modules/http.module/service/http-parameters.class';
import { _API_ENDPOINTS } from './api/api-settings';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) { }

  obtenerValorParametro(parametro: string): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'obtenerValorParametro',
        parametro: parametro
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          // Respuesta OK
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }
}
