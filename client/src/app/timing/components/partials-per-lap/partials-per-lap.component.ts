// angular
import { Component, Input, OnChanges } from '@angular/core';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-partials-per-lap',
  templateUrl: './partials-per-lap.component.html',
  styleUrls: ['./partials-per-lap.component.scss']
})
export class PartialPerLapComponent implements OnChanges {
  @Input() title = '';
  @Input() trackActivity: RaceParticipantTrackActivity;
  @Input() bestRaceParticipantTrackActivity: RaceParticipantTrackActivity;

  private bestLap: TrackLap;

  ngOnChanges() {
    if (this.bestRaceParticipantTrackActivity && this.bestRaceParticipantTrackActivity.best_lap) {
      this.bestLap = this.bestRaceParticipantTrackActivity.best_lap;
    }
  }

  getBestLap(_lap: TrackLap) {
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
