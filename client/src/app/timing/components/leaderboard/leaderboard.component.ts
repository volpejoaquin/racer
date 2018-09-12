// angular
import { Component, Input, OnChanges } from '@angular/core';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap,
  TrackPartialLap
} from '../../../shared/model/';

// dummy data
import { REF_LAP } from '../../../shared/dummy/';

@Component({
  selector: 'racer-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnChanges {
  @Input() trackActivities: RaceParticipantTrackActivity[];
  bestLap: TrackLap = REF_LAP;


  ngOnChanges() {
    if (this.trackActivities[0] && this.trackActivities[0].best_lap && this.trackActivities[0].best_lap.time) {
      this.bestLap = this.trackActivities[0].best_lap;
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
}
