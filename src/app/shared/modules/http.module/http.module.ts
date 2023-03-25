import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { HttpService } from "./service/http.service";
import { AuthModule } from "src/app/auth/auth.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    AuthModule,
    HttpClientModule,
    TranslateModule
  ],
  providers: [HttpService],
  exports: [
    HttpClientModule
  ]
})
export class HttpModule {}
