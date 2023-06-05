import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { _API_ENDPOINTS } from 'src/app/services/api/api-settings';
import { HttpParametersClass } from '../../modules/http.module/service/http-parameters.class';
import { HttpService } from '../../modules/http.module/service/http.service';
import { LoadingService } from '../../modules/loading.module/service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Liga',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Noticias',
          url: '/liga/noticias',
        },
        {
          titulo: 'Equipos',
          url: '/liga/equipos',
        },
        {
          titulo: 'Lesionados',
          url: '/liga/lesionados-liga',
        },
        {
          titulo: 'Apuestas',
          url: '/liga/apuestas-liga',
        },
        {
          titulo: 'Historico',
          url: '/liga/historico',
        },
        {
          titulo: 'Normativa',
          url: '/liga/normativa',
        },
        {
          titulo: 'Cambiar de liga',
          url: '/liga/cambiar-liga',
        },
      ],
    },
    {
      titulo: 'Mercado',
      icono: 'mdi mdi-bullseye',
      submenu: [
        {
          titulo: 'Jugadores',
          url: '/mercado/jugadores',
        },
        {
          titulo: 'Derechos',
          url: '/mercado/derechos',
        },
        {
          titulo: 'Draft Picks',
          url: '/mercado/draft-picks-mercado',
        },
        {
          titulo: 'Trading Block',
          url: '/mercado/trading-block',
        },
      ],
    },
    {
      titulo: 'Agencia Libre',
      icono: 'mdi mdi-file',
      submenu: [
        {
          titulo: 'Jugadores',
          url: '/agencia-libre/jugadores-al-season',
        },
        {
          titulo: 'Jugadores',
          url: '/agencia-libre/jugadores-al',
        },
        {
          titulo: 'Jugadores',
          url: '/agencia-libre/jugadores-al-offseason',
        },
        {
          titulo: 'Pujas Activas',
          url: '/agencia-libre/pujas-activas-al-offseason',
        },
      ],
    },
    {
      titulo: 'Renovaciones',
      icono: 'mdi mdi-chart-bubble',
      submenu: [
        {
          titulo: 'Jugadores',
          url: '/renovaciones/jugadores-renovaciones',
        },
        {
          titulo: 'Pujas Activas',
          url: '/renovaciones/pujas-activas-renovaciones',
        },
      ],
    },
    {
      titulo: 'Draft',
      icono: 'mdi mdi-map-marker',
      submenu: [
        {
          titulo: 'Draft',
          url: '/draft/draft-picks',
        },
      ],
    }
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) {
  }

  obtenerNumOfertasRealizadasEquipo(pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.sidebar.start}`,
      body: {
        action: 'obtenerNumOfertasRealizadasEquipo',
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

  obtenerNumOfertasRecibidasEquipo(pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.sidebar.start}`,
      body: {
        action: 'obtenerNumOfertasRecibidasEquipo',
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

  obtenerNumSubastasAbiertasEquipo(pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.sidebar.start}`,
      body: {
        action: 'obtenerNumSubastasAbiertasEquipo',
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

  obtenerNumClaimsEquipo(pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.sidebar.start}`,
      body: {
        action: 'obtenerNumClaimsEquipo',
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

  obtenerNumLLDEquipo(pkEquipo: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.sidebar.start}`,
      body: {
        action: 'obtenerNumLLDEquipo',
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

  obtenerNumSubastasAbiertas(pkLiga: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.sidebar.start}`,
      body: {
        action: 'obtenerNumSubastasAbiertas',
        pkLiga: pkLiga
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
