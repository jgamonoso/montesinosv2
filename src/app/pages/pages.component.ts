import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from '../shared/modules/loading.module/service/loading.service';
import { SettingsService } from './account-settings/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit, OnDestroy {

  year = new Date().getFullYear();
  loading$: Observable<boolean>; // Variable para almacenar el observable del estado del spinner
  loading: boolean;
  private loadingSubscription: Subscription;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
    this.loadingSubscription = this.loadingService.loading$.subscribe((loading) => {
      setTimeout(() => {
        this.loading = loading;
        // console.log('load: ', this.loading)
        this.cdr.markForCheck();
      }, 0);
    });
  }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
    customInitFunctions();
    customInitFunctions();
  }

  ngOnDestroy(): void {
    console.log('------ngOnDestroy------');
    this.loadingSubscription.unsubscribe();
  }
}
