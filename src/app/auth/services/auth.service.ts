import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { xorEncryptDecrypt } from 'src/app/shared/functions/xor-encryption/xor-encryption.component';
import { HttpParametersClass } from 'src/app/shared/modules/http.module/service/http-parameters.class';
import { HttpService } from 'src/app/shared/modules/http.module/service/http.service';
import { _API_ENDPOINTS } from 'src/app/services/api/api-settings';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

const API_URL = environment.API_URL;
const SECRET_KEY = environment.SECRET_KEY;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingService
  ) {
  }

  authenticate(credentials: { login: string; password: string }): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.login.start}`,
      body: credentials
    });
    return this.httpService.post(httpParametersClass).pipe(
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
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }

  obtenerProximasTemporadas(): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.miequipo.start}`,
      body: {
        action: 'obtenerProximasTemporadas'
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          // Guardar las credenciales en el localStorage o sessionStorage cuando la respuesta sea exitosa
          if (response) {
            const encryptedData = xorEncryptDecrypt(JSON.stringify(response), SECRET_KEY);
            const remember = this.getRemember();

            if (remember) {
              localStorage.setItem('proximasTemporadas', encryptedData);
            } else {
              sessionStorage.setItem('proximasTemporadas', encryptedData);
            }
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }

  obtenerTemporadaActual(): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.login.start}`,
      body: {
        action: 'obtenerTemporadaActual'
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          // Guardar las credenciales en el localStorage o sessionStorage cuando la respuesta sea exitosa
          if (response.pkTemporada) {
            const encryptedData = xorEncryptDecrypt(JSON.stringify(response), SECRET_KEY);
            const remember = this.getRemember();

            if (remember) {
              localStorage.setItem('temporada', encryptedData);
            } else {
              sessionStorage.setItem('temporada', encryptedData);
            }
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }

  obtenerManagerPorLogin(login: string): Observable<any> {
    const httpParametersClass = new HttpParametersClass({
      url: `${_API_ENDPOINTS.host}${_API_ENDPOINTS.login.start}`,
      body: {
        action: 'obtenerManagerPorLogin',
        login: login
      }
    });
    return this.httpService.post(httpParametersClass).pipe(
      tap(
        response => {
          // Guardar las credenciales en el localStorage o sessionStorage cuando la respuesta sea exitosa
          if (response.login) {
            this.setManagerToStore(response);
          }
        },
        error => {
          this.loadingService.setLoadingState(false);
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

  // Método para obtener la temporada almacenada:
  getStoredTemporada(): any {
    const encryptedData = this.getRemember()
      ? localStorage.getItem('temporada')
      : sessionStorage.getItem('temporada');

    if (!encryptedData) {
      return null;
    }
    const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedData);
  }

  // Método para obtener el manager almacenado:
  getStoredManager(): any {
    const encryptedData = this.getRemember()
      ? localStorage.getItem('manager')
      : sessionStorage.getItem('manager');

    if (!encryptedData) {
      return null;
    }
    const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedData);
  }

  // Método para almacenar el manager y pkManager en el storage:
  setManagerToStore(param: any): any {
    let pkManager = param.pkManager
    const encryptedData = xorEncryptDecrypt(JSON.stringify(param), SECRET_KEY);
    const encryptedpkManager = xorEncryptDecrypt(JSON.stringify(pkManager), SECRET_KEY);
    const remember = this.getRemember();

    if (remember) {
      localStorage.setItem('manager', encryptedData);
      localStorage.setItem('pkManager', encryptedpkManager)
    } else {
      sessionStorage.setItem('manager', encryptedData);
      sessionStorage.setItem('pkManager', encryptedpkManager)
    }
  }

  // Método para obtener el pkManager almacenado:
  getStoredPkManager(): Observable<any> {
    return new Observable((observer) => {
      const intervalId = setInterval(() => {
        let encryptedData = this.getRemember()
          ? localStorage.getItem('pkManager')
          : sessionStorage.getItem('pkManager');

        if (encryptedData) {
          const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
          observer.next(JSON.parse(decryptedData));
        }
      }, 100);

      return () => {
        clearInterval(intervalId);
      };
    });
  }

  // Método para almacenar la imagenPerfil en el storage:
  setImagenPerfilToStore(param: any): any {
    const encryptedData = xorEncryptDecrypt(JSON.stringify(param), SECRET_KEY);
    const remember = this.getRemember();

    if (remember) {
      localStorage.setItem('imagenPerfil', encryptedData);
    } else {
      sessionStorage.setItem('imagenPerfil', encryptedData);
    }
  }

  // Método para obtener la imagenPerfil almacenado:
  getStoredImagenPerfil(): any {
    const encryptedData = this.getRemember()
      ? localStorage.getItem('imagenPerfil')
      : sessionStorage.getItem('imagenPerfil');

    if (!encryptedData) {
      return null;
    }
    const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedData);
  }

  // Método para obtener datos de la liga guardada:
  getStoredLigaGuardada(): any {
    const encryptedData = this.getRemember()
      ? localStorage.getItem('ligaGuardada')
      : sessionStorage.getItem('ligaGuardada');

    if (!encryptedData) {
      return null;
    }
    const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedData);
  }

  // Método para obtener datos de las proximas temporadas:
  getStoredProximasTemporadas(): any {
    const encryptedData = this.getRemember()
      ? localStorage.getItem('proximasTemporadas')
      : sessionStorage.getItem('proximasTemporadas');

    if (!encryptedData) {
      return null;
    }
    const decryptedData = xorEncryptDecrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedData);
  }

  //método para eliminar las credenciales almacenadas (por ejemplo, al cerrar sesión):
  removeStoredData(): void {
    if (this.getRemember()) {
      localStorage.removeItem('credentials');
      localStorage.removeItem('temporada');
      localStorage.removeItem('manager');
      localStorage.removeItem('ligaGuardada');
      localStorage.removeItem('proximasTemporadas');
      localStorage.removeItem('pkManager');
      localStorage.removeItem('imagenPerfil');
      this.deleteRemember();
    } else {
      sessionStorage.removeItem('credentials');
      sessionStorage.removeItem('temporada');
      sessionStorage.removeItem('manager');
      sessionStorage.removeItem('ligaGuardada');
      sessionStorage.removeItem('proximasTemporadas');
      sessionStorage.removeItem('pkManager');
      sessionStorage.removeItem('imagenPerfil');
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
