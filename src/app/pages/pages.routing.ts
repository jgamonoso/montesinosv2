import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { Grafica1Component } from 'src/app/pages/grafica1/grafica1.component';
import { ProgressComponent } from 'src/app/pages/progress/progress.component';
import { AccountSettingsComponent } from 'src/app/pages/account-settings/account-settings.component';
import { EquipoDetalleComponent } from './features/mi-equipo/equipo-detalle/equipo-detalle.component';
import { OfertasRecibidasComponent } from './features/mi-equipo/ofertas-recibidas/ofertas-recibidas.component';
import { OfertasEnviadasComponent } from './features/mi-equipo/ofertas-enviadas/ofertas-enviadas.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'account-settings', component: AccountSettingsComponent },
    ],
  },
  {
    path: 'mi-equipo', // Crear una nueva instancia de PagesComponent para la ruta /mi-equipo
    component: PagesComponent,
    children: [
      { path: '', component: EquipoDetalleComponent },
      { path: 'equipo-detalle', component: EquipoDetalleComponent },
      { path: 'ofertas-recibidas', component: OfertasRecibidasComponent },
      { path: 'ofertas-enviadas', component: OfertasEnviadasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
