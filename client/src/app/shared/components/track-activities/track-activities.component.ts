// angular
import { Component, Input, OnInit, OnChanges, HostListener } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// modules
import * as fromTiming from '../../../timing/reducers';
import { TrackActivityActions } from './../../../timing/actions';

// models
import {
  TrackActivity
} from '../../../shared/model/';

@Component({
  selector: 'racer-track-activities',
  templateUrl: './track-activities.component.html',
  styleUrls: ['./track-activities.component.scss']
})
export class TrackActivitiesComponent implements OnInit, OnChanges {
  @Input() trackActivities: TrackActivity[];
  selectedTrackActivity: TrackActivity;

  private trackActivityIndex = 0;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    let nextTrackActivityId: string;
    switch (keyCode) {
      // up key
      case 38:
        if (this.trackActivityIndex >= 1) {
          this.trackActivityIndex--;
        }
        event.preventDefault();
        nextTrackActivityId = this.trackActivities[this.trackActivityIndex].id;
        break;
      // down key
      case 40:
        if (this.trackActivityIndex < this.trackActivities.length) {
          this.trackActivityIndex++;
        }
        event.preventDefault();
        nextTrackActivityId = this.trackActivities[this.trackActivityIndex].id;
        break;
    }

    if (nextTrackActivityId) {
      this.selectTrackActivity(nextTrackActivityId);
    }

  }

  constructor(private store: Store<fromTiming.State>) {
  }

  ngOnInit() {
    this.store.select(fromTiming.getSelectedTrackActivity).subscribe((tActivity: TrackActivity) => {
      this.selectedTrackActivity = tActivity;

      if (this.selectedTrackActivity) {
        this.trackActivities.forEach((tAct: TrackActivity, tActIndex: number) => {
          if (tAct.id === this.selectedTrackActivity.id) {
            this.trackActivityIndex = tActIndex;
          }
        });
      }
    });
  }

  ngOnChanges() {
    // TODO: Scroll to selectedTrackActivity
  }

  onSelectTrackActivity(trackActivity: TrackActivity) {
    this.selectTrackActivity(trackActivity.id);
  }

  isSelectedTrackActivity(trackActivity: TrackActivity) {
    return this.selectedTrackActivity && this.selectedTrackActivity.id === trackActivity.id;
  }

  private selectTrackActivity(trackActivityId: string) {
    this.store.dispatch(new TrackActivityActions.SelectTrackActivity(trackActivityId));
  }
}
