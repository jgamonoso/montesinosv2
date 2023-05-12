import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from '../../liga/equipos/equipos.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { ComisionadoService } from '../comisionado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias-comi',
  templateUrl: './noticias-comi.component.html',
  styleUrls: ['./noticias-comi.component.css']
})
export class NoticiasComiComponent implements OnInit {

  managerEnSesion: any; // Manager logueado
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  noticiaForm: FormGroup;

  listaLigas = [
    { value: '-', viewValue: 'Ambas' },
    { value: '1', viewValue: 'MNBA' },
    { value: '2', viewValue: 'DLEAGUE' },
  ];

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService,
    private readonly loadingService: LoadingService,
    private comisionadoService: ComisionadoService,
    private router: Router,
  ) {
    this.noticiaForm = new FormGroup({
      notificacion: new FormControl('', Validators.required),
      liga: new FormControl('-', Validators.required),
    });
  }

  ngOnInit(): void {
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
  }


  onSubmit(): void {
    if (this.noticiaForm.valid) {
      console.log(this.noticiaForm.value);
      this.comisionadoService.altaNoticiaComi(this.noticiaForm.value.notificacion, this.noticiaForm.value.liga, this.managerEnSesion.pkManager).subscribe(
        (response) => {
          // this.loading = false;
          if (response.status === 'ok') {
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error) => {
          // this.loading = false;
          // console.error('Error de inicio de sesión', error.message);
          console.error('Error de creación de noticia', error.message);
        }
      );
    }

  }
}