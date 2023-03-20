import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  constructor(private translate: TranslateService) {
    translate.addLangs(environment.langArray);
    translate.setDefaultLang(this.defaultLang());
    translate.use(this.getLang());
  }

  public defaultLang(): string {
    return this.translate.defaultLang;
  }

  public currentLang(): string {
    return this.translate.currentLang;
  }

  public arrayLang(): Array<string> {
    return this.translate.getLangs();
  }

  public objectLang(): Array<{ label: string; value: string }> {
    const objectLang: Array<{ label: string; value: string }> = [];
    this.translate.getLangs().forEach((lang: string) => {
      objectLang.push({
        label: lang,
        value: lang
      });
    });
    return objectLang;
  }

  public setUse(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    if (window) {
      window.location.reload();
    }
  }

  public getLang(): string {
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang');
    } else {
      return environment.langDefault;
    }
  }
}
