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

  altaNoticiaComi(notificacion: string, pkLiga: string , pkManager: number): Observable<any> {
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
