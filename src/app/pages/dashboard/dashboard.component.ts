import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { xorEncryptDecrypt } from 'src/app/shared/functions/xor-encryption/xor-encryption.component';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { environment } from 'src/environments/environment';

const SECRET_KEY = environment.SECRET_KEY;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  credencialesEnSesion: any;
  ligaGuardada: { ligaVisible: number; ligaPropia: boolean } = {
    ligaVisible: 1,
    ligaPropia: true,
  };
  ligaVisibleLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadingService.setLoadingState(true);
    this.credencialesEnSesion = this.authService.getStoredCredentials();
    this.ligaGuardada.ligaVisible = Number(this.credencialesEnSesion.liga);
    this.ligaGuardada.ligaPropia = true;
    forkJoin([
      this.authService.obtenerTemporadaActual(),
      this.authService.obtenerManagerPorLogin(this.credencialesEnSesion.manager),
    ]).subscribe(
      ([temporadaActual, managerPorLogin]) => {
        // console.log('Temporada actual:', temporadaActual);
        // console.log('Manager por login:', managerPorLogin);

        this.setligaVisible();
      },
      (error) => {
        console.error('Error al obtener la temporada actual o manager por login', error.message);
      }
    );
  }

  setligaVisible(){
    const encryptedData = xorEncryptDecrypt(JSON.stringify(this.ligaGuardada), SECRET_KEY);
    const remember = this.authService.getRemember();
    if (remember) {
      localStorage.setItem('ligaGuardada', encryptedData);
    } else {
      sessionStorage.setItem('ligaGuardada', encryptedData);
    }
    this.ligaVisibleLoaded = true;
  }
}