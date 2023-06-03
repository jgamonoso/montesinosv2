import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Pipe({
  name: 'equiponbacompleto'
})
export class EquiponbacompletoPipe implements PipeTransform {

  constructor(
    private sharedService: SharedService
  ) {}

  transform(fkEquipoOri: string): any {
    return this.sharedService.equiposNbaMap[fkEquipoOri] || 'OTR';
  }
}
