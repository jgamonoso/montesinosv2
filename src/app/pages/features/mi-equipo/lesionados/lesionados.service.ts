import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { _API_ENDPOINTS } from 'src/app/services/api/api-settings';
import { HttpParametersClass } from 'src/app/shared/modules/http.module/service/http-parameters.class';
import { HttpService } from 'src/app/shared/modules/http.module/service/http.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LesionadosService {

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) { }

  obtenerJugadoresLesionadosEquipo(pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'obtenerJugadoresLesionadosEquipo',
        pkEquipo: pkEquipo
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

  recuperarJugadorLesionado(pkManager: number, pkEquipo: number, pkJugadorliga: any, pkLiga: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'recuperarJugadorLesionado',
        pkManager: pkManager,
        pkEquipo: pkEquipo,
        pkJugadorliga: pkJugadorliga,
        pkLiga: pkLiga,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          if (response.status === 'ok') {
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }
}
