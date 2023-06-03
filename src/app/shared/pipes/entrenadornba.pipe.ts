import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Pipe({
  name: 'entrenadornba'
})
export class EntrenadornbaPipe implements PipeTransform {

  constructor(
    private sharedService: SharedService
  ) {}

  transform(fkEquipoOri: string): any {
    return this.sharedService.entrenadoresNbaMap[fkEquipoOri] || 'OTR';
  }
}
