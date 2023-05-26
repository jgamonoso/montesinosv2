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
export class RealizaOfertaService {

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) { }

  obtenerEquipoPorPk(pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'obtenerEquipoPorPk',
        pkEquipo: pkEquipo,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  crearOferta(
    pkManager: number,
    pkEquipo1: number,
    listaJugadoresEquipo1: any,
    listaDerechosEquipo1: any,
    listaDraftpicksEquipo1: any,
    pkEquipo2: number,
    listaJugadoresEquipo2: any,
    listaDerechosEquipo2: any,
    listaDraftpicksEquipo2: any,
  ): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'crearOferta',
        pkManager: pkManager,
        pkEquipo1: pkEquipo1,
        listaJugadoresEquipo1: listaJugadoresEquipo1,
        listaDerechosEquipo1: listaDerechosEquipo1,
        listaDraftpicksEquipo1: listaDraftpicksEquipo1,
        pkEquipo2: pkEquipo2,
        listaJugadoresEquipo2: listaJugadoresEquipo2,
        listaDerechosEquipo2: listaDerechosEquipo2,
        listaDraftpicksEquipo2: listaDraftpicksEquipo2,
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          // Guardar las credenciales en el localStorage o sessionStorage cuando la respuesta sea exitosa
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
