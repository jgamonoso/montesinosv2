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
export class EquipoDetalleService {

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) { }

  obtenerManager(pkManager: string): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'obtenerManager',
        pkManager: pkManager
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

  obtenerJugadorliga(pkJugadorliga: string): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'obtenerJugadorliga',
        pkJugadorliga: pkJugadorliga
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

  activarILDeJugador(managerId: number, jugadorId: number, fkLiga: number, pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'activarILDeJugador',
        managerId: managerId,
        jugadorId: jugadorId,
        fkLiga: fkLiga,
        pkEquipo: pkEquipo,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  recuperarJugadordeIL(managerId: number, jugadorId: number, fkLiga: number, pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'recuperarJugadordeIL',
        managerId: managerId,
        jugadorId: jugadorId,
        fkLiga: fkLiga,
        pkEquipo: pkEquipo,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  activarCovidDeJugador(managerId: number, jugadorId: number, fkLiga: number, pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'activarCovidDeJugador',
        managerId: managerId,
        jugadorId: jugadorId,
        fkLiga: fkLiga,
        pkEquipo: pkEquipo,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  recuperarJugadordeCovid(managerId: number, jugadorId: number, fkLiga: number, pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'recuperarJugadordeCovid',
        managerId: managerId,
        jugadorId: jugadorId,
        fkLiga: fkLiga,
        pkEquipo: pkEquipo,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addTradingBlock(managerId: number, pkEquipo: number, jugadorId: number, derechoId: number, draftPickId: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'addTradingBlock',
        managerId: managerId,
        jugadorId: jugadorId,
        derechoId: derechoId,
        draftPickId: draftPickId,
        pkEquipo: pkEquipo,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  recuperarDeTradingBlock(managerId: number, pkEquipo: number, jugadorId: number, derechoId: number, draftPickId: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'recuperarDeTradingBlock',
        managerId: managerId,
        jugadorId: jugadorId,
        derechoId: derechoId,
        draftPickId: draftPickId,
        pkEquipo: pkEquipo,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  dropJugador(managerId: number, jugadorId: number, pkEquipo: number, sancionAplicable: boolean): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'dropJugador',
        managerId: managerId,
        jugadorId: jugadorId,
        pkEquipo: pkEquipo,
        sancionAplicable: sancionAplicable
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
