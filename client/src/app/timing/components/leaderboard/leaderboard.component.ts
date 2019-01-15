// angular
import { Component, Input, OnChanges } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// actions
import * as fromRoot from '../../../core/reducers/';

// components
import { BaseTimingComponent } from './../base-timing/base-timing.component';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap,
  TrackActivity,
  TrackActivityType,
  RaceParticipantTrackActivityState
} from '../../../shared/model/';

@Component({
  selector: 'racer-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent extends BaseTimingComponent implements OnChanges {
  @Input() trackActivity: TrackActivity;
  @Input() trackActivities: RaceParticipantTrackActivity[];
  @Input() bestRaceParticipantTrackActivity: RaceParticipantTrackActivity;
  bestLap: TrackLap;

  orderBy: string | string[] = 'best_lap.time';
  orders: string | string[] = 'asc';

  private bestTotalTime: number;

  constructor(store: Store<fromRoot.State>) {
    super(store);
  }

  ngOnChanges() {
    if (this.bestRaceParticipantTrackActivity && this.bestRaceParticipantTrackActivity.best_lap) {
      this.bestLap = this.bestRaceParticipantTrackActivity.best_lap;
    }

    if (this.trackActivities && this.trackActivities.length > 1) {
      this.bestTotalTime = this.trackActivities[0].total_time;
    }
  }

  getTime(row: RaceParticipantTrackActivity): number {
    let response: number;

    switch (this.trackActivity.type) {
      case TrackActivityType.practice:
        response = row.best_lap ? row.best_lap.time : 0;
        break;
        case TrackActivityType.race:
        response = row.total_time ? row.total_time : 0;
        break;
    }

    return response;
  }

  calculateGap(index: number, row: RaceParticipantTrackActivity): number {
    if (index === 1) {
      return 0;
    }

    let response: number;

    switch (this.trackActivity.type) {
      case TrackActivityType.practice:
        response = row.best_lap && this.bestLap ? row.best_lap.time - this.bestLap.time : 0;
        break;
        case TrackActivityType.race:
        // response = row.total_time ? row.total_time - this.bestTotalTime : 0;
        response = 0; // TODO: REVIEW THIS
        break;
    }

    return response;
  }

  isTrackActivityOnPit(trackActivity: RaceParticipantTrackActivity) {
    return trackActivity.state=== RaceParticipantTrackActivityState.on_pit;
  }
}
