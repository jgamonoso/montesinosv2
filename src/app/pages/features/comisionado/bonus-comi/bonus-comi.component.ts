import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from '../../liga/equipos/equipos.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { ComisionadoService } from '../comisionado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonus-comi',
  templateUrl: './bonus-comi.component.html',
  styleUrls: ['./bonus-comi.component.css']
})
export class BonusComiComponent implements OnInit {

  managerEnSesion: any;
  dataLoaded: boolean;
  bonusForm: FormGroup;
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
    this.bonusForm = new FormGroup({
      equipo: new FormControl('', Validators.required),
      cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1})?$'), Validators.min(0), Validators.max(10)]),
      temporada: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadingService.setLoadingState(true);
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.managerEnSesion = this.authService.getStoredManager();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.bonusForm.get('temporada').setValue(this.listaTemporadas[0].pkTemporada);
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
    if (this.bonusForm.valid) {
      this.loadingService.setLoadingState(true);
      this.comisionadoService.altaBonusComi(this.managerEnSesion.pkManager,
                                        this.bonusForm.value.equipo,
                                        this.bonusForm.value.cantidad,
                                        this.bonusForm.value.temporada,
                                        this.bonusForm.value.motivo,
                                        this.ligaGuardadaEnSesion.ligaVisible)
      .subscribe(
        (response) => {
          this.loadingService.setLoadingState(false);
          if (response.status === 'ok') {
            this.verBonusAplicadoOK();
          }
        },
        (error) => {
          this.verBonusAplicadoKO();
          this.loadingService.setLoadingState(false);
          console.error('Error de aplicación de bonus');
        }
      );
    }
  }

  verBonusAplicadoOK(): void {
    this.router.navigate(['/comisionado/show-info'], {
      state: {
        titulo: 'Bonus aplicado',
        subtitulo: 'Se aplicó el bonus al equipo indicado',
        redirectUrl: '/comisionado/bonus'
      }
    });
  }

  verBonusAplicadoKO(): void {
    this.router.navigate(['/comisionado/show-info'], {
      state: {
        titulo: 'Bonus no aplicado',
        subtitulo: 'Habrá ocurrido algun error en el proceso',
        redirectUrl: '/comisionado/bonus'
      }
    });
  }
}