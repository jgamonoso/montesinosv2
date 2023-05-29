import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from '../../liga/equipos/equipos.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { ComisionadoService } from '../comisionado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sanciones-comi',
  templateUrl: './sanciones-comi.component.html',
  styleUrls: ['./sanciones-comi.component.css']
})
export class SancionesComiComponent implements OnInit {

  managerEnSesion: any;
  dataLoaded: boolean;
  sancionForm: FormGroup;
  listaManagers: any[];

  listaTemporadas: any[];
  ligaGuardadaEnSesion: any;

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService,
    private readonly loadingService: LoadingService,
    private comisionadoService: ComisionadoService,
    private router: Router,
  ) {
    this.sancionForm = new FormGroup({
      equipo: new FormControl('', Validators.required),
      cantidad: new FormControl({ value: '0', disabled: true }, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1})?$'), Validators.min(0), Validators.max(10)]),
      tipoSancion: new FormControl(false),
      motivo: new FormControl('Warning por: ', Validators.required),
    });
  }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadingService.setLoadingState(true);
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.managerEnSesion = this.authService.getStoredManager();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();

    // Añade una suscripción a los cambios del FormControl "tipoSancion"
    this.sancionForm.get('tipoSancion').valueChanges.subscribe(tipoSancion => {
      const cantidadControl = this.sancionForm.get('cantidad');
      const motivoControl = this.sancionForm.get('motivo');

      if (tipoSancion) {
        cantidadControl.enable();
        cantidadControl.setValue('');
        motivoControl.setValue('(Sanción) ');
      } else {
        cantidadControl.disable();
        cantidadControl.setValue(0);
        motivoControl.setValue('(Warning) ');
      }
    });
    this.loadInitialData();
  }

  loadInitialData() {
    this.equiposService.obtenerListadoManagersConEquipo(this.ligaGuardadaEnSesion.ligaVisible)
      .subscribe(
        (listadoManagersConEquipo) => {
          this.listaManagers = listadoManagersConEquipo;
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
        },
        (error) => {
          console.error('Error en las llamadas', error.message);
          this.loadingService.setLoadingState(false);
        }
      );
  }

  onSubmit(): void {
    if (this.sancionForm.valid) {
      this.loadingService.setLoadingState(true);
      this.comisionadoService.altaSancionComi(this.managerEnSesion.pkManager,
                                        this.sancionForm.value.equipo,
                                        this.sancionForm.value.cantidad,
                                        this.listaTemporadas[0].pkTemporada,
                                        this.sancionForm.value.motivo,
                                        this.ligaGuardadaEnSesion.ligaVisible)
      .subscribe(
        (response) => {
          this.loadingService.setLoadingState(false);
          if (response.status === 'ok') {
            this.verSancionAplicadaOK();
          }
        },
        (error) => {
          this.verSancionAplicadaKO();
          this.loadingService.setLoadingState(false);
          console.error('Error de aplicación de sanción');
        }
      );
    }
  }

  verSancionAplicadaOK(): void {
    this.router.navigate(['/comisionado/show-info'], {
      state: {
        titulo: 'Sanción aplicada',
        subtitulo: 'Se aplicó la sanción al equipo indicado',
        redirectUrl: '/comisionado/sanciones'
      }
    });
  }

  verSancionAplicadaKO(): void {
    this.router.navigate(['/comisionado/show-info'], {
      state: {
        titulo: 'Sanción no aplicada',
        subtitulo: 'Habrá ocurrido algun error en el proceso',
        redirectUrl: '/comisionado/sanciones'
      }
    });
  }
}