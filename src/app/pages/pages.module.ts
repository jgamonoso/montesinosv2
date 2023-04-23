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

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
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
