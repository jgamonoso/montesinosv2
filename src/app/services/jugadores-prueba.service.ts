import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class JugadoresPruebaService {
  constructor(private http: HttpClient) {}

  getJugadores() {
    console.log('getJugadores()');
    return this.http.get(`${API_URL}/jugadores`);
  }
}
