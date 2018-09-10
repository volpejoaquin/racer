// angular
import { Pipe, PipeTransform } from '@angular/core';

// libs
import * as moment from 'moment';

@Pipe({
  name: 'partialLapTime'
})
export class PartialLapTimePipe implements PipeTransform {
  transform(time: number, showSimbol: boolean): string {
    if (!time && time !== 0) {
      return '';
    }

    let timeParsed = time;
    if (time < 0) {
      timeParsed = -time;
    }

    let timeString = moment(timeParsed).format('s.SSS');

    if (showSimbol) {
      const prefix = time < 0 ? '-' : '+';
      timeString = prefix + '' + timeString;
    }
    return timeString;
  }
}
