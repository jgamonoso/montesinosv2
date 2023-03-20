import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SelectLangComponent } from './component/select-lang.component/select-lang.component';
import { NgxFormlyModule } from '../ngx-formly.module/ngx-formly.module';
import {CoreModule} from '../../core.module';

@NgModule({
  imports: [
    CoreModule,
    TranslateModule,
    NgxFormlyModule
  ],
  declarations: [
    SelectLangComponent
  ],
  exports: [
    TranslateModule,
    SelectLangComponent
  ]
})
export class LangModule {}
