import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { LoadingService } from '../shared/modules/loading.module/service/loading.service';

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
    private settingsService: SettingsService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadingService.loading$.subscribe((loading) => {
      setTimeout(() => {
        this.loading = loading;
        this.cdr.markForCheck();
      }, 0);
    });
  }

  ngOnInit(): void {
    customInitFunctions();
    customInitFunctions();
  }
}
