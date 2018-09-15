// angular
import { Component, Input, OnChanges } from '@angular/core';

// libs
import * as lodash from 'lodash';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap,
  TrackPartialLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-best-per-partials',
  templateUrl: './best-per-partials.component.html',
  styleUrls: ['./best-per-partials.component.css']
})
export class BestPerPartialsComponent implements OnChanges {
  @Input() trackActivities: RaceParticipantTrackActivity[];
  @Input() bestLap: TrackLap;
  @Input() partialIndex = 1;

  ngOnChanges() {
    if (this.trackActivities && this.trackActivities.length > 0) {

      this.trackActivities = lodash.orderBy(
        this.trackActivities,
        (trackActivity: RaceParticipantTrackActivity) => {
          const partial = this.getPartial(trackActivity);
          return partial ? partial.time : Number.MAX_SAFE_INTEGER;
        },
        ['asc']
      );
    }
  }

  calculateGap(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !this.bestLap) {
      return '';
    }
    // Calculate gap
    return row.best_lap.time - this.bestLap.time;
  }

  calculateInterval(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !this.bestLap) {
      return '';
    }
    // Calculate interval
    return row.best_lap.time - this.trackActivities[index - 2].best_lap.time;
  }

  calculateGapCurrentLap(index: number, row: RaceParticipantTrackActivity) {
    if (
      !this.bestLap ||
      !row.last_lap ||
      !row.last_lap.partials ||
      row.last_lap.partials.length === 0
    ) {
      return 0;
    }
    let current_lap_time = 0,
      best_partial_time = 0;

    row.last_lap.partials.forEach((partial: TrackPartialLap, partialIndex: number) => {
      current_lap_time += partial.time;
      best_partial_time += this.bestLap.partials[partialIndex].time;
    });

    // Calculate gap
    return current_lap_time - best_partial_time;
  }

  getPartial(trackActivity: RaceParticipantTrackActivity) {
    let bestPartial = trackActivity.best_lap.partials[this.partialIndex],
      bestPartialTime = bestPartial ? bestPartial.time : 0,
      partial,
      partialTime;

    if (trackActivity.laps && trackActivity.laps.length > 0 && trackActivity.laps.length > this.partialIndex) {

      trackActivity.laps.forEach((lap: TrackLap) => {

        if (lap.partials && lap.partials.length > 0 && lap.partials.length > this.partialIndex) {
          partial = lap.partials[this.partialIndex];
          partialTime = partial ? partial.time : 0;

          if (partial && partialTime < bestPartialTime) {
            bestPartialTime = partialTime;
            bestPartial = partial;
          }
        }
      });
    }

    return bestPartial;
  }
}
