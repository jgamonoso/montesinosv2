import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpParametersClass } from '../shared/modules/http.module/service/http-parameters.class';
import { _API_ENDPOINTS } from './api/api-settings';
import { HttpService } from '../shared/modules/http.module/service/http.service';
import { LoadingService } from '../shared/modules/loading.module/service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  images = [
    'background-1.jpg',
    'background-2.jpg',
    'background-3.jpg',
    'background-4.jpg',
    'background-5.jpg',
    'background-6.jpg',
    'background-8.jpg',
    'background-10.jpg',
    'background-11.jpg',
    'background-12.jpg',
    'background-13.jpg',
    'background-14.jpg',
  ];

  equiposLigaMap: { [key: string]: string } = {};
  equiposNbaMap: { [key: string]: string } = {};
  equiposNbaAbrevMap: { [key: string]: string } = {};
  entrenadoresNbaMap: { [key: string]: string } = {};
  temporadasMap: { [key: string]: string } = {};

  private searchResultsSource = new Subject<any>();
  searchResults$ = this.searchResultsSource.asObservable();

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) {
  }

  updateSearchResults(data: any): void {
    this.searchResultsSource.next(data);
  }

  obtenerListaEquiposNombre(): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.liga.start}`,
      body: {
        action: 'obtenerListaEquiposNombre'
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          if (Array.isArray(response)) {
            response.forEach(equipo => {
              this.equiposLigaMap[equipo.pkEquipo] = equipo.nombre;
            });
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }

  obtenerListaEquiposNba(): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.liga.start}`,
      body: {
        action: 'obtenerListaEquiposNba'
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          if (Array.isArray(response)) {
            response.forEach(equiponba => {
              this.equiposNbaMap[equiponba.pkEquipoNba] = equiponba.nombre;
              this.equiposNbaAbrevMap[equiponba.pkEquipoNba] = equiponba.abrev;
            });
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }

  obtenerListaEntrenadores(): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.liga.start}`,
      body: {
        action: 'obtenerListaEntrenadores'
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          if (Array.isArray(response)) {
            response.forEach(entrenadornba => {
              this.entrenadoresNbaMap[entrenadornba.pkEntrenador] = entrenadornba.nombre + " ("+ entrenadornba.equipo +")";
            });
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }

  obtenerListaTemporadas(): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.liga.start}`,
      body: {
        action: 'obtenerListaTemporadas'
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          if (Array.isArray(response)) {
            response.forEach(temporada => {
              this.temporadasMap[temporada.pkTemporada] = temporada.nombre;
            });
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }
}
