import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Pipe({
  name: 'equiponba'
})
export class EquiponbaPipe implements PipeTransform {

  constructor(
    private sharedService: SharedService
  ) {}

  transform(fkEquipoOri: string): any {
    return this.sharedService.equiposNbaAbrevMap[fkEquipoOri] || 'OTR';
  }
}
