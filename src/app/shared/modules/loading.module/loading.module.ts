import { NgModule} from '@angular/core';

// Módulos
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module/material.module';

// Servicios
import { LoadingService } from './service/loading.service';

// Componentes
import { LoadingComponent } from './component/loading.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    LoadingService
  ],
})
export class LoadingModule {
}
