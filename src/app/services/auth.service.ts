import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

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
    debugger;
    return this.http.post<any>(base_url + 'login/login.php', credentials);
  }
}
