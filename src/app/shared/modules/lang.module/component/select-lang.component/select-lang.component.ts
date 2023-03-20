import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {LangService} from '../../service/lang.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html'
})
export class SelectLangComponent implements OnInit, OnDestroy, AfterViewInit {

  public form: FormGroup;
  public model: any;
  public fields: Array<FormlyFieldConfig>;

  private subscriptions: Subscription[] = [];

  constructor(private readonly service: LangService) {

    this.form = new FormGroup({});
    this.fields = [
      {
        type: 'flex-layout',
        templateOptions: {
          fxLayout: 'column',
          class: 'select-lang'
        },
        fieldGroup: [
          {
            key: 'lang',
            type: 'select',
            templateOptions: {
              class: '',
              placeholder: 'Lang',
              options: this.service.objectLang()
            }
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
    this.model = {
      lang: this.service.currentLang()
    };
  }

  ngAfterViewInit(): void {
    this.form.get('lang').valueChanges.subscribe((lang: string) => {
      this.service.setUse(lang);
    });
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


}
