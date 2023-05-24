import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-rechazada',
  templateUrl: './oferta-rechazada.component.html',
  styleUrls: ['./oferta-rechazada.component.css']
})
export class OfertaRechazadaComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.verOfertasRecibidas();
    }, 3000);
  }

  verOfertasRecibidas(): void {
    this.router.navigate(['/mi-equipo/ofertas-recibidas']);
  }
}