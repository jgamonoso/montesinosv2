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
import { JugadoresComponent } from './features/mercado/jugadores/jugadores.component';
import { DerechosComponent } from './features/mercado/derechos/derechos.component';
import { DraftPicksMercadoComponent } from './features/mercado/draft-picks-mercado/draft-picks-mercado.component';
import { TradingBlockComponent } from './features/mercado/trading-block/trading-block.component';
import { JugadoresAlOffseasonComponent } from './features/agencia-libre/jugadores-al-offseason/jugadores-al-offseason.component';
import { JugadoresAlSeasonComponent } from './features/agencia-libre/jugadores-al-season/jugadores-al-season.component';
import { JugadoresAlComponent } from './features/agencia-libre/jugadores-al/jugadores-al.component';
import { PujasActivasAlComponent } from './features/agencia-libre/pujas-activas-al/pujas-activas-al.component';
import { JugadoresRenovacionesComponent } from './features/renovaciones/jugadores-renovaciones/jugadores-renovaciones.component';
import { PujasActivasRenovacionesComponent } from './features/renovaciones/pujas-activas-renovaciones/pujas-activas-renovaciones.component';
import { DraftPicksComponent } from './features/draft/draft-picks/draft-picks.component';
import { LigaComiComponent } from './features/comisionado/liga-comi/liga-comi.component';
import { BonusComiComponent } from './features/comisionado/bonus-comi/bonus-comi.component';
import { DraftComiComponent } from './features/comisionado/draft-comi/draft-comi.component';
import { EntrenadoresComiComponent } from './features/comisionado/entrenadores-comi/entrenadores-comi.component';
import { EquiposComiComponent } from './features/comisionado/equipos-comi/equipos-comi.component';
import { JugadoresComiComponent } from './features/comisionado/jugadores-comi/jugadores-comi.component';
import { MatchupComiComponent } from './features/comisionado/matchup-comi/matchup-comi.component';
import { NoticiasComiComponent } from './features/comisionado/noticias-comi/noticias-comi.component';
import { SancionesComiComponent } from './features/comisionado/sanciones-comi/sanciones-comi.component';
import { SubastasComiComponent } from './features/comisionado/subastas-comi/subastas-comi.component';
import { TradesComiComponent } from './features/comisionado/trades-comi/trades-comi.component';
import { WaiversComiComponent } from './features/comisionado/waivers-comi/waivers-comi.component';
import { EquiposAdminComponent } from './features/administrador/equipos-admin/equipos-admin.component';
import { ManagersAdminComponent } from './features/administrador/managers-admin/managers-admin.component';
import { ParametrosLigaAdminComponent } from './features/administrador/parametros-liga-admin/parametros-liga-admin.component';
import { ActivarIlComponent } from './features/mi-equipo/activar-il/activar-il.component';
import { ActivarCovidComponent } from './features/mi-equipo/activar-covid/activar-covid.component';
import { ActivarTradingBlockComponent } from './features/mi-equipo/activar-trading-block/activar-trading-block.component';
import { NormativaBackupComponent } from './features/liga/normativa-backup/normativa-backup.component';
import { DropJugadorComponent } from './features/mi-equipo/drop-jugador/drop-jugador.component';

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
      { path: 'activar-il', component: ActivarIlComponent },
      { path: 'activar-covid', component: ActivarCovidComponent },
      { path: 'activar-trading-block', component: ActivarTradingBlockComponent },
      { path: 'drop-jugador', component: DropJugadorComponent },
    ],
  },
  {
    path: 'liga', // Crear una nueva instancia de PagesComponent para la ruta /liga
    component: PagesComponent,
    children: [
      { path: '', component: NoticiasComponent },
      { path: 'noticias', component: NoticiasComponent },
      { path: 'equipos', component: EquiposComponent },
      { path: 'lesionados-liga', component: LesionadosLigaComponent },
      { path: 'apuestas-liga', component: ApuestasLigaComponent },
      { path: 'historico', component: HistoricoComponent },
      { path: 'normativa', component: NormativaComponent },
      { path: 'normativa-backup', component: NormativaBackupComponent },
      { path: 'cambiar-liga', component: CambiarLigaComponent },
    ],
  },
  {
    path: 'mercado', // Crear una nueva instancia de PagesComponent para la ruta /mercado
    component: PagesComponent,
    children: [
      { path: '', component: JugadoresComponent },
      { path: 'jugadores', component: JugadoresComponent },
      { path: 'derechos', component: DerechosComponent },
      { path: 'draft-picks-mercado', component: DraftPicksMercadoComponent },
      { path: 'trading-block', component: TradingBlockComponent },
    ],
  },
  {
    path: 'agencia-libre', // Crear una nueva instancia de PagesComponent para la ruta /agencia-libre
    component: PagesComponent,
    children: [
      { path: '', component: JugadoresAlComponent },
      { path: 'jugadores-al', component: JugadoresAlComponent },
      { path: 'jugadores-al-season', component: JugadoresAlSeasonComponent },
      { path: 'jugadores-al-offseason', component: JugadoresAlOffseasonComponent },
      { path: 'pujas-activas-al', component: PujasActivasAlComponent },
    ],
  },
  {
    path: 'renovaciones', // Crear una nueva instancia de PagesComponent para la ruta /renovaciones
    component: PagesComponent,
    children: [
      { path: '', component: JugadoresRenovacionesComponent },
      { path: 'jugadores-renovaciones', component: JugadoresRenovacionesComponent },
      { path: 'pujas-activas-renovaciones', component: PujasActivasRenovacionesComponent },
    ],
  },
  {
    path: 'draft', // Crear una nueva instancia de PagesComponent para la ruta /draft
    component: PagesComponent,
    children: [
      { path: '', component: DraftPicksComponent },
      { path: 'draft-picks', component: DraftPicksComponent },
    ],
  },
  {
    path: 'comisionado', // Crear una nueva instancia de PagesComponent para la ruta /comisionado
    component: PagesComponent,
    children: [
      { path: '', component: LigaComiComponent },
      { path: 'liga', component: LigaComiComponent },
      { path: 'equipos', component: EquiposComiComponent },
      { path: 'jugadores', component: JugadoresComiComponent },
      { path: 'entrenadores', component: EntrenadoresComiComponent },
      { path: 'draft', component: DraftComiComponent },
      { path: 'trades', component: TradesComiComponent },
      { path: 'subastas', component: SubastasComiComponent },
      { path: 'waivers', component: WaiversComiComponent },
      { path: 'sanciones', component: SancionesComiComponent },
      { path: 'bonus', component: BonusComiComponent },
      { path: 'noticias', component: NoticiasComiComponent },
      { path: 'matchup', component: MatchupComiComponent },
    ],
  },
  {
    path: 'administrador', // Crear una nueva instancia de PagesComponent para la ruta /administrador
    component: PagesComponent,
    children: [
      { path: '', component: ManagersAdminComponent },
      { path: 'managers', component: ManagersAdminComponent },
      { path: 'equipos', component: EquiposAdminComponent },
      { path: 'parametros-liga', component: ParametrosLigaAdminComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
