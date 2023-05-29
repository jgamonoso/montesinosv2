import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { _API_ENDPOINTS } from 'src/app/services/api/api-settings';
import { HttpParametersClass } from 'src/app/shared/modules/http.module/service/http-parameters.class';
import { HttpService } from 'src/app/shared/modules/http.module/service/http.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ComisionadoService {

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) { }

  altaNoticiaComi(notificacion: string, pkLiga: string, pkManager: number): Observable<any> {
    const prioridad = 1;
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.comisionado.start}`,
      body: {
        action: 'altaNoticiaComi',
        notificacion: notificacion,
        pkLiga: pkLiga,
        prioridad: prioridad,
        pkManager: pkManager
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

  obtenerListaTradesPendientes(): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.comisionado.start}`,
      body: {
        action: 'obtenerListaTradesPendientes'
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

  validarTrade(pkTrade: number, pkManager: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.comisionado.start}`,
      body: {
        action: 'validarTrade',
        pkTrade: pkTrade,
        pkManager: pkManager,
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

  vetarTrade(pkTrade: number, pkManager: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.comisionado.start}`,
      body: {
        action: 'vetarTrade',
        pkTrade: pkTrade,
        pkManager: pkManager,
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

  altaBonusComi(pkManager: number, pkEquipo: number, cantidad: number, temporada: string, motivo: string, pkLiga: string): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.comisionado.start}`,
      body: {
        action: 'altaBonusComi',
        pkManager: pkManager,
        pkEquipo: pkEquipo,
        cantidad: cantidad,
        temporada: temporada,
        motivo: motivo,
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

  altaSancionComi(pkManager: number, pkEquipo: number, cantidad: number, temporada: number, motivo: string, pkLiga: string): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.comisionado.start}`,
      body: {
        action: 'altaSancionComi',
        pkManager: pkManager,
        pkEquipo: pkEquipo,
        cantidad: cantidad,
        temporada: Number(temporada),
        motivo: motivo,
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
