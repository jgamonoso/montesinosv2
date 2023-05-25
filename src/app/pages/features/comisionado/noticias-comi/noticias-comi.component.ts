import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { ComisionadoService } from '../comisionado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias-comi',
  templateUrl: './noticias-comi.component.html',
  styleUrls: ['./noticias-comi.component.css']
})
export class NoticiasComiComponent implements OnInit {

  managerEnSesion: any;
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
      this.loadingService.setLoadingState(true);
      this.comisionadoService.altaNoticiaComi(this.noticiaForm.value.notificacion, this.noticiaForm.value.liga, this.managerEnSesion.pkManager).subscribe(
        (response) => {
          // this.loading = false;
          this.loadingService.setLoadingState(false);
          if (response.status === 'ok') {
            this.verNoticiaEnviadaOK();
          }
        },
        (error) => {
          this.verNoticiaEnviadaKO();
          // this.loading = false;
          this.loadingService.setLoadingState(false);
          console.error('Error de creación de noticia');
        }
      );
    }
  }

  verNoticiaEnviadaOK(): void {
    this.router.navigate(['/comisionado/show-info'], {
      state: {
        titulo: 'Noticia enviada',
        subtitulo: 'Ahora una cervecita y a descansar',
        redirectUrl: '/comisionado/noticias'
      }
    });
  }

  verNoticiaEnviadaKO(): void {
    this.router.navigate(['/comisionado/show-info'], {
      state: {
        titulo: 'Noticia no enviada',
        subtitulo: 'Habrá ocurrido algun error en el proceso',
        redirectUrl: '/comisionado/noticias'
      }
    });
  }

}