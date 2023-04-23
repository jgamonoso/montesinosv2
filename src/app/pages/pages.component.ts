import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../shared/modules/loading.module/service/loading.service';
import { SettingsService } from './account-settings/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear();
  loading$: Observable<boolean>; // Variable para almacenar el observable del estado del spinner
  loading: boolean;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
    this.loadingService.loading$.subscribe((loading) => {
      setTimeout(() => {
        console.log('load1: ', this.loading)
        this.loading = loading;
        console.log('load2: ', this.loading)
        this.cdr.markForCheck();
      }, 0);
    });
  }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
    customInitFunctions();
    customInitFunctions();
  }
}
