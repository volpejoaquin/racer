// angular
import { Component, Input } from '@angular/core';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap,
  TrackPartialLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  @Input() trackActivities: RaceParticipantTrackActivity[];
  @Input() bestLap: TrackLap;

  calculateGap(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !row.best_lap || !this.bestLap ) {
      return '';
    }
    // Calculate gap
    return row.best_lap.time - this.bestLap.time;
  }

  calculateInterval(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !row.best_lap || !this.bestLap ||
      this.trackActivities[index - 2] ||
      this.trackActivities[index - 2].best_lap) {
      return '';
    }
    // Calculate interval
    return row.best_lap.time - this.trackActivities[index - 2].best_lap.time;
  }

  calculateGapCurrentLap(index: number, row: RaceParticipantTrackActivity) {
    if (
      !row.last_lap ||
      !this.bestLap ||
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
