// angular
import { Component, Input, OnChanges } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// actions
import * as fromRoot from '../../../core/reducers/';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap
} from '../../../shared/model/';

// components
import { BaseTimingComponent } from './../base-timing/base-timing.component';

@Component({
  selector: 'racer-partials-per-lap',
  templateUrl: './partials-per-lap.component.html',
  styleUrls: ['./partials-per-lap.component.scss']
})
export class PartialsPerLapComponent extends BaseTimingComponent implements OnChanges {
  @Input() title = '';
  @Input() trackActivity: RaceParticipantTrackActivity;
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

  getLap(lap: TrackLap) {
    return lap;
  }

  getBestLap() {
    return this.trackActivity ? this.trackActivity.best_lap : null;
  }

  getPoleLap() {
    return this.bestLap;
  }

  getPartial(lap: TrackLap, partialIndex: number) {
    return lap.partials[partialIndex];
  }

  getBestPartial(_lap: TrackLap, partialIndex: number) {
    return this.trackActivity.best_lap ? this.trackActivity.best_lap.partials[partialIndex] : null;
  }

  getPolePartial(partialIndex: number) {
    return this.bestLap ? this.bestLap.partials[partialIndex] : null;
  }
}
