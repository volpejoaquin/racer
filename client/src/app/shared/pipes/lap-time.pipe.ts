// angular
import { Pipe, PipeTransform } from '@angular/core';

// libs
import * as moment from 'moment';

@Pipe({
  name: 'lapTime'
})
export class LapTimePipe implements PipeTransform {
  transform(time: number, args: string): string {
    if (!time || time === 0) {
      return '';
    }
    let formatString = 'm:ss.SSS';

    if (time < 60000) {
      formatString = 's.SSS';
    }
    return moment(time).format(formatString);
  }
}
