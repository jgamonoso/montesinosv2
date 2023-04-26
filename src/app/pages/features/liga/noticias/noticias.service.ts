import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { _API_ENDPOINTS } from 'src/app/services/api/api-settings';
import { HttpParametersClass } from 'src/app/shared/modules/http.module/service/http-parameters.class';
import { HttpService } from 'src/app/shared/modules/http.module/service/http.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {

  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService
  ) { }

  obtenerNoticias(pagina: number, pkLiga?: number): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.liga.start}${_API_ENDPOINTS.liga.noticias}?pagina=${pagina}&pkLiga=${pkLiga}`,
    });
    return this.httpService.get(httpParametersClass).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
