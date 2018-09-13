// angular
import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { map, take } from 'rxjs/operators';

// models
import {
  TrackActivity,
  TrackActivityState
} from '../../../shared/model';

@Component({
  selector: 'racer-track-activity-state',
  templateUrl: './track-activity-state.component.html',
  styleUrls: ['./track-activity-state.component.css']
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

  // private methods
  private start(duration) {
    this.timerDurationStarted = true;

    this.durationTime$ = interval(1000).pipe(
      take(duration),
      map((v: number) => duration - v )
    );
  }

  private stop() {
    this.timerDurationStarted = false;
    this.durationTime$ = null;
  }
}
