import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SelectLangComponent } from './component/select-lang.component/select-lang.component';

@NgModule({
  imports: [
    TranslateModule,
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
