import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresPruebaService } from 'src/app/services/jugadores-prueba.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {

  datos: any;
  credenciales: any;

  constructor(
    private jugadoresPruebaService: JugadoresPruebaService,
    private router: Router,
    private authService: AuthService,
    // public readonly authService: AuthService,,
  ) {}

  ngOnInit(): void {
    // this.jugadoresPruebaService.getJugadores().subscribe(
    //   (resp) => {
    //     if (resp) {
    //       this.datos = resp;
    //     }
    //   },
    //   (err) => console.warn(err)
    // );

    this.credenciales = this.authService.getStoredCredentials();
    if (!this.credenciales) {
      this.router.navigate(['/auth/login']);
    }
  }
}
