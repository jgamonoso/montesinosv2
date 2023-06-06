import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { xorEncryptDecrypt } from 'src/app/shared/functions/xor-encryption/xor-encryption.component';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../services/shared.service';

const SECRET_KEY = environment.SECRET_KEY;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ligaGuardadaEnSesion: any;
  credencialesEnSesion: any;
  ligaGuardada: { ligaVisible: number; ligaPropia: boolean } = {
    ligaVisible: 1,
    ligaPropia: true,
  };
  ligaVisibleLoaded: boolean = false;
  noticiasVisible: boolean = true;

  constructor(
    private authService: AuthService,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService,
  ) {
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.credencialesEnSesion = this.authService.getStoredCredentials();
  }

  ngOnInit(): void {
    if (!this.ligaGuardadaEnSesion) {
      this.ligaVisibleLoaded = false;
      this.noticiasVisible = true;
      this.loadInitialData();
    } else {
      this.ligaVisibleLoaded = true;
    }
  }

  loadInitialData() {
    this.loadingService.setLoadingState(true);
    this.ligaGuardada.ligaVisible = Number(this.credencialesEnSesion.liga);
    this.ligaGuardada.ligaPropia = true;
    forkJoin([
      this.authService.obtenerTemporadaActual(),
      this.authService.obtenerProximasTemporadas(),
      this.authService.obtenerManagerPorLogin(this.credencialesEnSesion.manager),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([temporadaActual, proximasTemporadas, managerPorLogin, listaEquiposNombre]) => {
        this.setligaVisible();
        this.loadingService.setLoadingState(false);
        this.reloadPage();
      },
      (error) => {
        console.error('Error en dashboard', error.message);
        this.loadingService.setLoadingState(false);
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
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
  }

  reloadPage() {
    window.location.reload();
  }

  updateNoticiasVisibility(resultadosBusqueda: any): void {
    this.noticiasVisible = resultadosBusqueda === null;
  }
}