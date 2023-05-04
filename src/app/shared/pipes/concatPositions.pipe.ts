import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatPositions'
})
export class ConcatPositionsPipe implements PipeTransform {

  transform(positions: any[]): string {
    if (positions) {
      return positions.map(pos => pos.nombre).join(', ');
    } else {
      return '-';
    }
  }
}