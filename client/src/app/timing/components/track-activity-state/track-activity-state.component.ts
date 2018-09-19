// angular
import { Component, Input, OnChanges } from '@angular/core';
import { Observable, interval, of } from 'rxjs';

import { map, take } from 'rxjs/operators';

// models
import {
  TrackActivity,
  TrackActivityState
} from '../../../shared/model';

@Component({
  selector: 'racer-track-activity-state',
  templateUrl: './track-activity-state.component.html',
  styleUrls: ['./track-activity-state.component.scss']
})
export class TrackActivityStateComponent implements OnChanges {
  @Input() trackActivity: TrackActivity;
  durationTime$: Observable<number>;
  trackActivityStates = TrackActivityState;

  private timerDurationStarted = false;

  constructor() {
  }

  ngOnChanges() {
    // Check track activity duration
    if (this.trackActivity && this.trackActivity.duration) {
      if (this.trackActivity.state === TrackActivityState.started ||
        this.trackActivity.state === TrackActivityState.caution) {

          if (!this.timerDurationStarted) {
            this.start(this.trackActivity.duration);
          }

      } else {
        if (this.timerDurationStarted) {
          this.stop();
        }
      }
    }
  }

  isDurationRunning() {
    return !!this.durationTime$;
  }

  // private methods
  private start(duration) {
    this.timerDurationStarted = true;

    this.durationTime$ = interval(1000).pipe(
      take(duration),
      map((v: number) => duration - (v * 1000) )
    );
  }

  private stop() {
    this.timerDurationStarted = false;
    this.durationTime$ = null;
  }
}
