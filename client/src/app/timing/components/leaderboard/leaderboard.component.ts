// angular
import { Component, Input, OnChanges } from '@angular/core';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnChanges {
  @Input() trackActivities: RaceParticipantTrackActivity[];
  @Input() bestRaceParticipantTrackActivity: RaceParticipantTrackActivity;

  private bestLap: TrackLap;

  ngOnChanges() {
    if (this.bestRaceParticipantTrackActivity && this.bestRaceParticipantTrackActivity.best_lap) {
      this.bestLap = this.bestRaceParticipantTrackActivity.best_lap;
    }
  }

  calculateGap(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !row.best_lap || !this.bestLap) {
      return '';
    }
    // Calculate gap
    return row.best_lap.time - this.bestLap.time;
  }
}
