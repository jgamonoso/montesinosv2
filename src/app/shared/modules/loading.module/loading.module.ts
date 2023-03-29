import { NgModule} from '@angular/core';
import { LoadingComponent } from './component/loading.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module/material.module';
import { LoadingService } from './service/loading.service';

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
