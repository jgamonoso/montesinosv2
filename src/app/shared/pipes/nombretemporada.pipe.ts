import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Pipe({
  name: 'nombretemporada'
})
export class NombretemporadaPipe implements PipeTransform {

  constructor(
    private sharedService: SharedService
  ) {}

  transform(fkTemporada: string): any {
    return this.sharedService.temporadasMap[fkTemporada] || 'OTR';
  }
}
