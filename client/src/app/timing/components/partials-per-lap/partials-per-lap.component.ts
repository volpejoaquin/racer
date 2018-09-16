// angular
import { Component, Input } from '@angular/core';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap,
  TrackPartialLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-partials-per-lap',
  templateUrl: './partials-per-lap.component.html',
  styleUrls: ['./partials-per-lap.component.scss']
})
export class PartialPerLapComponent {
  @Input() title = '';
  @Input() trackActivity: RaceParticipantTrackActivity;
  @Input() bestLap: TrackLap;

  constructor() { }

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
}
