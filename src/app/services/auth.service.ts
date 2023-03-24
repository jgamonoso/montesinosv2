import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { xorEncryptDecrypt } from '../shared/functions/xor-encryption/xor-encryption.component';

const API_URL = environment.API_URL;
const SECRET_KEY = 'your-secret-key';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public remember: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.remember = false;
  }


  authenticate(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post<any>(API_URL + 'login/login.php', credentials).pipe(
      tap(response => {
        //guardar las credenciales en el localStorage cuando la respuesta sea exitosa
        if (response.status === 'ok') {
          this.remember = this.remember
            ? this.saveRemember()
            : this.deleteRemember();

          const encryptedData = xorEncryptDecrypt(JSON.stringify(response), SECRET_KEY);
          localStorage.setItem('credentials', encryptedData);
        }
      })
    );
  }

  //método para obtener las credenciales almacenadas:
  getStoredCredentials(): any {
    const encryptedData = localStorage.getItem('credentials');
    if (!encryptedData) {
      return null;
    }
    const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedData);
  }

  //método para eliminar las credenciales almacenadas (por ejemplo, al cerrar sesión):
  removeStoredCredentials(): void {
    localStorage.removeItem('credentials');
  }

  setRemember(value: boolean): void {
    this.remember = value;
  }

  private saveRemember(): boolean {
    sessionStorage.setItem('remember', 'true');
    return true;
  }

  private deleteRemember(): boolean {
    sessionStorage.removeItem('remember');
    return false;
  }
}
