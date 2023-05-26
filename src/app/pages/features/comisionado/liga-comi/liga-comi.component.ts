import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    { value: 'RENOVACIONES', viewValue: '1 - Renovaciones' },
    { value: 'AL_OFFSEASON', viewValue: '2 - AL Offseason' },
    { value: 'SEASON', viewValue: '3 - Season' },
    { value: 'TEAM_OPTION', viewValue: '4 - Team Option / LLD' },
    { value: 'CORTE_GRATIS', viewValue: '5 - Corte Gratis' },
  ];

  confirmationMessage: string = '';
  showConfirmation: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();

    // Aquí tendrías que obtener el estado actual de la temporada y asignarlo al control:
    this.estadoControl.setValue(this.temporadaEnSesion.estado);
  }

  onSubmit() {
    console.log(this.estadoControl.value);
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

  confirm() {
    console.log(this.estadoControl.value);
    // Aquí enviarías el nuevo estado al backend.

    // Ocultar el botón de confirmación y el mensaje de confirmación.
    this.showConfirmation = false;
    this.confirmationMessage = '';
  }
}
