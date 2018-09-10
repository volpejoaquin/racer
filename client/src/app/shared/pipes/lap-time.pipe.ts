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
    return moment(time).format('m:ss.SSS');
  }
}
