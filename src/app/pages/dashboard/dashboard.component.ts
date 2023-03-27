import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { JugadoresPruebaService } from 'src/app/services/jugadores-prueba.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  noticias: any;
  fechas: string[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getNoticias(1,1).subscribe((data) => {
      this.noticias = data;
      this.fechas = Object.keys(data);
    });
  }
}