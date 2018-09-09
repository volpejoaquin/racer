import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'partialLapTime'
})
export class PartialLapTimePipe {
  transform(time: number, args: string): string {
    if (!time || time === 0) {
      return '';
    }
    return moment(time).format('s.SSS');
  }
}
