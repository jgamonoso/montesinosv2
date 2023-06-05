import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { ComisionadoService } from '../comisionado.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-liga-comi',
  templateUrl: './liga-comi.component.html',
  styleUrls: ['./liga-comi.component.css']
})
export class LigaComiComponent implements OnInit {

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  estadoControl = new FormControl();
  estados = [
    { value: 'RENOVACIONES', viewValue: '1 - Renovaciones', next: 'AL_OFFSEASON' },
    { value: 'AL_OFFSEASON', viewValue: '2 - AL Offseason', next: 'SEASON' },
    { value: 'SEASON', viewValue: '3 - Season', next: 'TEAM_OPTION' },
    { value: 'TEAM_OPTION', viewValue: '4 - Team Option / LLD', next: 'CORTE_GRATIS' },
    { value: 'CORTE_GRATIS', viewValue: '5 - Corte Gratis', next: 'RENOVACIONES' },
  ];
  estadoActual: any;
  estadoSiguiente: any;

  confirmationMessage: string = '';
  showConfirmation: boolean = false;

  constructor(
    private authService: AuthService,
    private readonly loadingService: LoadingService,
    private comisionadoService: ComisionadoService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();

    // Aquí tendrías que obtener el estado actual de la temporada y asignarlo al control:
    this.estadoControl.setValue(this.temporadaEnSesion.estado);
    this.estadoActual = this.estados.find(estado => estado.value === this.temporadaEnSesion.estado);
    this.estadoSiguiente = this.estados.find(estado => estado.value === this.estadoActual.next);
    this.estadoControl.valueChanges.subscribe(() => {
      this.showConfirmation = false;
    });
  }

  modificar() {
    this.estadoControl.setValue(this.estadoSiguiente.value);
    this.showConfirmation = true;

    switch (this.estadoControl.value) {
      case 'RENOVACIONES':
        this.confirmationMessage = "La liga pasará a estado 'Renovaciones', se iniciará una nueva temporada, se convertirá en FA los contratos y derechos expirados, y se abrirá el mercado de jugadores que han finalizado contrato. ¿Desea continuar?";
        break;
      case 'AL_OFFSEASON':
        this.confirmationMessage = "La liga pasará a estado 'AL Offseason', se abrirá la AL Offseason y se habilitará la opción de Draft. ¿Desea continuar?";
        break;
      case 'SEASON':
        this.confirmationMessage = "La liga pasará a estado 'Season', se finalizarán todas las pujas pendientes y los adds de jugadores serán inmediatos. ¿Desea continuar?";
        break;
      case 'TEAM_OPTION':
        this.confirmationMessage = "La liga pasará a estado 'Team Option/LLD', se bloqueará la FA, se permitirá recuperar jugadores lesionados, y soltar gratis a contratos rookies. ¿Desea continuar?";
        break;
      case 'CORTE_GRATIS':
        this.confirmationMessage = "La liga pasará a estado 'Corte Gratis', se habilitará un corte gratis para cada equipo. ¿Desea continuar?";
        break;
      default:
        this.confirmationMessage = '';
        this.showConfirmation = false;
        break;
    }
  }

  onSubmit() {
    this.showConfirmation = false;
    this.confirmationMessage = '';

    this.loadingService.setLoadingState(true);
      this.comisionadoService.cambiarEstadoTemporadaActual(this.managerEnSesion.pkManager, this.estadoControl.value)
      .subscribe(
        (response) => {
          if (response.status === 'ok') {
            forkJoin([
              this.authService.obtenerTemporadaActual(),
              this.authService.obtenerProximasTemporadas(),
            ]).subscribe(
              ([temporadaActual, proximasTemporadas]) => {
                this.loadingService.setLoadingState(false);
                this.verCambioEstadoOK();
              },
              (error) => {
                console.log(error)
                this.verCambioEstadoKO();
                console.error('Error de inicio de sesión');
                this.loadingService.setLoadingState(false);
              }
            );
          }
        },
        (error) => {
          console.log(error)
          this.verCambioEstadoKO();
          this.loadingService.setLoadingState(false);
          console.error('Error de cambio de estado de liga');
        }
      );
  }

  verCambioEstadoOK(): void {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Estado de liga cambiado',
        subtitulo: 'Se aplicó el cambio de estado',
        redirectUrl: '/comisionado/liga'
      }
    });
  }

  verCambioEstadoKO(): void {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Estado de liga NO cambiado',
        subtitulo: 'Ha ocurrido un error en el proceso',
        redirectUrl: '/comisionado/liga'
      }
    });
  }
}
