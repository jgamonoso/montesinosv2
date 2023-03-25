import { Component, OnInit } from '@angular/core';
import { LangService } from '../shared/modules/lang.module/service/lang.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: [ './error404.component.css' ],
})
export class Error404Component  {

  constructor(
    public langService: LangService
  ) {
  }

  year = new Date().getFullYear();

}
