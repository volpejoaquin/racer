// angular
import { Component, Input, OnChanges } from '@angular/core';

// libs
import * as lodash from 'lodash';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-best-per-partials',
  templateUrl: './best-per-partials.component.html',
  styleUrls: ['./best-per-partials.component.scss']
})
export class BestPerPartialsComponent implements OnChanges {
  @Input() trackActivities: RaceParticipantTrackActivity[];
  @Input() bestRaceParticipantTrackActivity: RaceParticipantTrackActivity;
  @Input() partialIndex = 1;

  private bestLap: TrackLap;

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

    if (this.bestRaceParticipantTrackActivity && this.bestRaceParticipantTrackActivity.best_lap) {
      this.bestLap = this.bestRaceParticipantTrackActivity.best_lap;
    }
  }

  getBestLap(trackActivity: RaceParticipantTrackActivity) {
    return trackActivity.best_lap;
  }

  getPoleLap() {
    return this.bestLap;
  }

  getPartial(trackActivity: RaceParticipantTrackActivity) {
    if (!trackActivity.best_lap) {
      return;
    }

    let bestPartial = trackActivity.best_lap.partials[this.partialIndex],
      bestPartialTime = bestPartial ? bestPartial.time : 0,
      partial,
      partialTime;

    if (trackActivity.laps && trackActivity.laps.length > 0 && trackActivity.laps.length > this.partialIndex) {

      trackActivity.laps.forEach((lap: TrackLap) => {

        if (lap.partials && lap.partials.length > 0 && lap.partials.length > this.partialIndex) {
          partial = lap.partials[this.partialIndex];
          partialTime = partial ? partial.time : 0;

          if (partial && partialTime > 0 && partialTime < bestPartialTime) {
            bestPartialTime = partialTime;
            bestPartial = partial;
          }
        }
      });
    }

    return bestPartial;
  }

  getBestPartial(trackActivity: RaceParticipantTrackActivity) {
    return trackActivity.best_lap ? trackActivity.best_lap.partials[this.partialIndex] : null;
  }

  getPolePartial() {
    return this.bestLap ? this.bestLap.partials[this.partialIndex] : null;
  }
}
