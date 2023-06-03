import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Pipe({
  name: 'equipoliga'
})
export class EquipoligaPipe implements PipeTransform {

  constructor(
    private sharedService: SharedService
  ) {}

  transform(fkEquipoOri: string): any {
    return this.sharedService.equiposLigaMap[fkEquipoOri] || 'OTR';
  }
}
