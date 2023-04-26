import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cambiar-liga',
  templateUrl: './cambiar-liga.component.html',
  styleUrls: ['./cambiar-liga.component.css']
})
export class CambiarLigaComponent implements OnInit, OnDestroy {

  // Añade una propiedad para almacenar la suscripción
  queryParamsSubscription: Subscription;
  liga: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.liga = +params['liga'];
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
