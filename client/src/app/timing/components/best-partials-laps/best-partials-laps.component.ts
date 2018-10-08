// angular
import { Component, Input, OnChanges } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// actions
import * as fromRoot from '../../../core/reducers/';

// models
import {
  TrackActivity,
  RaceParticipantTrackActivity,
  TrackLap
} from '../../../shared/model/';

// components
import { BaseTimingComponent } from './../base-timing/base-timing.component';

@Component({
  selector: 'racer-best-partials-laps',
  templateUrl: './best-partials-laps.component.html',
  styleUrls: ['./best-partials-laps.component.scss']
})
export class BestPartialsLapsComponent extends BaseTimingComponent implements OnChanges {
  @Input() trackActivity: TrackActivity[];
  @Input() trackActivities: RaceParticipantTrackActivity[];
  @Input() bestRaceParticipantTrackActivity: RaceParticipantTrackActivity;

  private bestLap: TrackLap;

  constructor(store: Store<fromRoot.State>) {
    super(store);
  }

  ngOnChanges() {
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

  getPartial(trackActivity: RaceParticipantTrackActivity, partialIndex: number) {
    return trackActivity.best_lap ? trackActivity.best_lap.partials[partialIndex] : null;
  }

  getBestPartial(trackActivity: RaceParticipantTrackActivity, partialIndex: number) {
    return trackActivity.best_lap ? trackActivity.best_lap.partials[partialIndex] : null;
  }

  getPolePartial(partialIndex: number) {
    return this.bestLap ? this.bestLap.partials[partialIndex] : null;
  }
}
