// angular
import { Pipe, PipeTransform, Inject } from '@angular/core';

// libs
import * as lodash from 'lodash';

// models
import { TrackActivity, TrackActivityType } from '../model';

@Pipe({
  name: 'orderByTrackActivity'
})
export class OrderByTrackActivityPipe implements PipeTransform {

  transform(value: any[], trackActivity: TrackActivity, useTrackActivityType: boolean = true): any[] {
    if (!value) {
      return [];
    }

    const trackActivityType = trackActivity && useTrackActivityType ? trackActivity.type : TrackActivityType.practice;
    let orderBy, orders;

    switch (trackActivityType) {
      case TrackActivityType.practice:
        orderBy = 'best_lap.time';
        orders = 'asc';
        break;
      case TrackActivityType.race:
        orderBy = ['laps_count', 'total_time'];
        orders = ['desc', 'asc'];
        break;
    }

    return lodash.orderBy(value, orderBy, orders);
  }
}
