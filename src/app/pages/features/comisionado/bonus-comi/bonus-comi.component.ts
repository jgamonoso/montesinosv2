import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from '../../liga/equipos/equipos.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-bonus-comi',
  templateUrl: './bonus-comi.component.html',
  styleUrls: ['./bonus-comi.component.css']
})
export class BonusComiComponent implements OnInit {

  dataLoaded: boolean;
  bonusForm: FormGroup;
  listaManagers: any[]; // Aquí deberías cargar la lista de managers con equipo

  listaTemporadas: any[]; // Aquí deberías cargar las próximas temporadas
  ligaGuardadaEnSesion: any;

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService,
    private readonly loadingService: LoadingService
  ) {
    this.bonusForm = new FormGroup({
      equipo: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      temporada: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadingService.setLoadingState(true);
    // Aquí deberías cargar la lista de managers y temporadas desde tu servicio.
    // this.listaManagers = this.authService.getListaManagersConEquipo();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.loadInitialData();
  }

  loadInitialData() {
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.equiposService.obtenerListadoManagersConEquipo(this.ligaGuardadaEnSesion.ligaVisible)
      .subscribe(
        (listadoManagersConEquipo) => {
          // console.log('listadoManagersConEquipo:', listadoManagersConEquipo);
          this.listaManagers = listadoManagersConEquipo;
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
        },
        (error) => {
          console.error('Error en las llamadas', error.message);
        }
      );
  }

  onSubmit(): void {
    if (this.bonusForm.valid) {
      // Aquí deberías enviar los datos del formulario a tu backend.
      console.log(this.bonusForm.value);
    }
  }
}