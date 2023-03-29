import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { xorEncryptDecrypt } from '../shared/functions/xor-encryption/xor-encryption.component';
import { HttpParametersClass } from '../shared/modules/http.module/service/http-parameters.class';
import { HttpService } from '../shared/modules/http.module/service/http.service';
import { _API_ENDPOINTS } from './api/api-settings';

const API_URL = environment.API_URL;
const SECRET_KEY = 'montesinos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService
  ) {
  }

  authenticate(credentials: { login: string; password: string }): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.login.start}`,
      body: credentials
    });
    return this.httpService.postLogin(httpParametersClass).pipe(
      tap(
        response => {
          // Guardar las credenciales en el localStorage o sessionStorage cuando la respuesta sea exitosa
          if (response.status === 'ok') {
            const encryptedData = xorEncryptDecrypt(JSON.stringify(response), SECRET_KEY);
            const remember = this.getRemember();

            if (remember) {
              localStorage.setItem('credentials', encryptedData);
            } else {
              sessionStorage.setItem('credentials', encryptedData);
            }
          }
        },
        error => {
        }
      )
    );
  }

  // Método para obtener las credenciales almacenadas:
getStoredCredentials(): any {
  const encryptedData = this.getRemember()
    ? localStorage.getItem('credentials')
    : sessionStorage.getItem('credentials');

  if (!encryptedData) {
    return null;
  }
  const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
  return JSON.parse(decryptedData);
}

  //método para eliminar las credenciales almacenadas (por ejemplo, al cerrar sesión):
  removeStoredCredentials(): void {
    if (this.getRemember()) {
      localStorage.removeItem('credentials');
      this.deleteRemember();
    } else {
      sessionStorage.removeItem('credentials');
    }
  }

  getRemember(): boolean {
    return !!JSON.parse(localStorage.getItem('remember'));
  }

  saveRemember(): void {
    localStorage.setItem('remember', 'true');
  }

  deleteRemember(): void {
    localStorage.removeItem('remember');
  }
}
