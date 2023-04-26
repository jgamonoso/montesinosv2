import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Módulos
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/modules/material.module/material.module';

//Componentes
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { Grafica1Component } from 'src/app/pages/grafica1/grafica1.component';
import { PagesComponent } from 'src/app/pages/pages.component';
import { ProgressComponent } from 'src/app/pages/progress/progress.component';
import { JugadoresComponent } from './features/mercado/jugadores/jugadores.component';
import { DerechosComponent } from './features/mercado/derechos/derechos.component';
import { DraftPicksMercadoComponent } from './features/mercado/draft-picks-mercado/draft-picks-mercado.component';
import { TradingBlockComponent } from './features/mercado/trading-block/trading-block.component';
import { ApuestasLigaComponent } from './features/liga/apuestas-liga/apuestas-liga.component';
import { CambiarLigaComponent } from './features/liga/cambiar-liga/cambiar-liga.component';
import { EquiposComponent } from './features/liga/equipos/equipos.component';
import { HistoricoComponent } from './features/liga/historico/historico.component';
import { LesionadosLigaComponent } from './features/liga/lesionados-liga/lesionados-liga.component';
import { NormativaComponent } from './features/liga/normativa/normativa.component';
import { ApuestasComponent } from './features/mi-equipo/apuestas/apuestas.component';
import { EquipoDetalleComponent } from './features/mi-equipo/equipo-detalle/equipo-detalle.component';
import { LesionadosComponent } from './features/mi-equipo/lesionados/lesionados.component';
import { OfertasEnviadasComponent } from './features/mi-equipo/ofertas-enviadas/ofertas-enviadas.component';
import { OfertasRecibidasComponent } from './features/mi-equipo/ofertas-recibidas/ofertas-recibidas.component';
import { PujasActivasComponent } from './features/mi-equipo/pujas-activas/pujas-activas.component';
import { WaiversComponent } from './features/mi-equipo/waivers/waivers.component';
import { JugadoresAlComponent } from './features/agencia-libre/jugadores-al/jugadores-al.component';
import { JugadoresAlSeasonComponent } from './features/agencia-libre/jugadores-al-season/jugadores-al-season.component';
import { JugadoresAlOffseasonComponent } from './features/agencia-libre/jugadores-al-offseason/jugadores-al-offseason.component';
import { PujasActivasAlComponent } from './features/agencia-libre/pujas-activas-al/pujas-activas-al.component';
import { JugadoresRenovacionesComponent } from './features/renovaciones/jugadores-renovaciones/jugadores-renovaciones.component';
import { PujasActivasRenovacionesComponent } from './features/renovaciones/pujas-activas-renovaciones/pujas-activas-renovaciones.component';
import { DraftPicksComponent } from './features/draft/draft-picks/draft-picks.component';
import { LigaComiComponent } from './features/comisionado/liga-comi/liga-comi.component';
import { NoticiasComponent } from './features/liga/noticias/noticias.component';
import { EquiposComiComponent } from './features/comisionado/equipos-comi/equipos-comi.component';
import { JugadoresComiComponent } from './features/comisionado/jugadores-comi/jugadores-comi.component';
import { EntrenadoresComiComponent } from './features/comisionado/entrenadores-comi/entrenadores-comi.component';
import { DraftComiComponent } from './features/comisionado/draft-comi/draft-comi.component';
import { TradesComiComponent } from './features/comisionado/trades-comi/trades-comi.component';
import { SubastasComiComponent } from './features/comisionado/subastas-comi/subastas-comi.component';
import { WaiversComiComponent } from './features/comisionado/waivers-comi/waivers-comi.component';
import { SancionesComiComponent } from './features/comisionado/sanciones-comi/sanciones-comi.component';
import { BonusComiComponent } from './features/comisionado/bonus-comi/bonus-comi.component';
import { NoticiasComiComponent } from './features/comisionado/noticias-comi/noticias-comi.component';
import { MatchupComiComponent } from './features/comisionado/matchup-comi/matchup-comi.component';
import { ManagersAdminComponent } from './features/administrador/managers-admin/managers-admin.component';
import { EquiposAdminComponent } from './features/administrador/equipos-admin/equipos-admin.component';
import { ParametrosLigaAdminComponent } from './features/administrador/parametros-liga-admin/parametros-liga-admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    EquipoDetalleComponent,
    OfertasRecibidasComponent,
    OfertasEnviadasComponent,
    PujasActivasComponent,
    WaiversComponent,
    LesionadosComponent,
    ApuestasComponent,
    NoticiasComponent,
    EquiposComponent,
    LesionadosLigaComponent,
    ApuestasLigaComponent,
    HistoricoComponent,
    NormativaComponent,
    CambiarLigaComponent,
    JugadoresComponent,
    DerechosComponent,
    DraftPicksMercadoComponent,
    TradingBlockComponent,
    JugadoresAlComponent,
    JugadoresAlSeasonComponent,
    JugadoresAlOffseasonComponent,
    PujasActivasAlComponent,
    JugadoresRenovacionesComponent,
    PujasActivasRenovacionesComponent,
    DraftPicksComponent,
    LigaComiComponent,
    EquiposComiComponent,
    JugadoresComiComponent,
    EntrenadoresComiComponent,
    DraftComiComponent,
    TradesComiComponent,
    SubastasComiComponent,
    WaiversComiComponent,
    SancionesComiComponent,
    BonusComiComponent,
    NoticiasComiComponent,
    MatchupComiComponent,
    ManagersAdminComponent,
    EquiposAdminComponent,
    ParametrosLigaAdminComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    HttpClientModule,
    MaterialModule
  ],
})
export class PagesModule {}
