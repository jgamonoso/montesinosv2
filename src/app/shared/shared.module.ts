import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { RouterModule } from '@angular/router';
import { HttpModule } from './modules/http.module/http.module';
import { TranslateModule } from '@ngx-translate/core';

//Componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingModule } from './modules/loading.module/loading.module';
import { Error404Component } from './error404/error404.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    HttpModule,
    LoadingModule
  ],
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    Error404Component
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    Error404Component,
    HttpModule,
    LoadingModule
  ],
})
export class SharedModule { }
