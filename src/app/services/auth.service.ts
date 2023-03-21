import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
    console.log('Hola, soy AuthService');
  }

  authenticate(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post<any>(API_URL + 'login/login.php', credentials);
  }
}
