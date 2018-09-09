import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'lapTime'
})
export class LapTimePipe {
  transform(time: number, args: string): string {
    if (!time || time === 0) {
      return '';
    }
    return moment(time).format('m:ss.SSS');
  }
}
