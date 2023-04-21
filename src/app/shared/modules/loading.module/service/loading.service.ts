import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  setLoadingState(isLoading: boolean): void {
    // console.log('LOADING!!');
    // console.log('isLoading:', isLoading);
    this.loadingSubject.next(isLoading);
  }
}