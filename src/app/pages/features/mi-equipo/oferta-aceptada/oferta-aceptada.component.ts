import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-aceptada',
  templateUrl: './oferta-aceptada.component.html',
  styleUrls: ['./oferta-aceptada.component.css']
})
export class OfertaAceptadaComponent implements OnInit {

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