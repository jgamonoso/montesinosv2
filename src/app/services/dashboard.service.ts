import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getNoticias(pagina: number, pkLiga?: number): Observable<any> {
    // let url = `${API_URL}v2/noticias.php`;
    let url = `${API_URL}v2/noticias.php?pagina=${pagina}`;
    if (pkLiga) {
      url += `&pkLiga=${pkLiga}`;
    }
    return this.http.get(url);
  }

}
