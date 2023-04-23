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
import { PujasActivasComponent } from './features/mi-equipo/pujas-activas/pujas-activas.component';
import { ApuestasComponent } from './features/mi-equipo/apuestas/apuestas.component';
import { LesionadosComponent } from './features/mi-equipo/lesionados/lesionados.component';
import { WaiversComponent } from './features/mi-equipo/waivers/waivers.component';
import { EquiposComponent } from './features/liga/equipos/equipos.component';
import { NoticiasComponent } from './features/liga/noticias/noticias.component';
import { ApuestasLigaComponent } from './features/liga/apuestas-liga/apuestas-liga.component';
import { HistoricoComponent } from './features/liga/historico/historico.component';
import { LesionadosLigaComponent } from './features/liga/lesionados-liga/lesionados-liga.component';
import { NormativaComponent } from './features/liga/normativa/normativa.component';
import { CambiarLigaComponent } from './features/liga/cambiar-liga/cambiar-liga.component';

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
      { path: 'pujas-activas', component: PujasActivasComponent },
      { path: 'waivers', component: WaiversComponent },
      { path: 'lesionados', component: LesionadosComponent },
      { path: 'apuestas', component: ApuestasComponent },
    ],
  },
  {
    path: 'liga', // Crear una nueva instancia de PagesComponent para la ruta /liga
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'noticias', component: DashboardComponent },
      { path: 'equipos', component: EquiposComponent },
      { path: 'lesionados-liga', component: LesionadosLigaComponent },
      { path: 'apuestas-liga', component: ApuestasLigaComponent },
      { path: 'historico', component: HistoricoComponent },
      { path: 'normativa', component: NormativaComponent },
      { path: 'cambiar-liga', component: CambiarLigaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
