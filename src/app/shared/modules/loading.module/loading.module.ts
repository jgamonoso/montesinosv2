import { NgModule} from '@angular/core';
import { LoadingComponent } from './component/loading.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module/material.module';

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
  ]
})
export class LoadingModule {
}
