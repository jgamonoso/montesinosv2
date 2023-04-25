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
export class EquiposService {

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) { }

  obtenerListadoManagersConEquipo(pkLiga: string): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.liga.start}`,
      body: {
        action: 'obtenerListadoManagersConEquipo',
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
