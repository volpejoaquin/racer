// angular
import { Component, Input, OnInit, OnChanges, HostListener } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

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

  private trackActivityId = 1;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    switch (keyCode) {
      // up key
      case 38:
        if (this.trackActivityId > 1) {
          this.trackActivityId--;
        }
        event.preventDefault();
        this.selectTrackActivity(this.trackActivityId);
        break;
      // down key
      case 40:
        if (this.trackActivityId < this.trackActivities.length) {
          this.trackActivityId++;
        }
        event.preventDefault();
        this.selectTrackActivity(this.trackActivityId);
        break;
    }

  }

  constructor(private store: Store<fromTiming.State>) {
  }

  ngOnInit() {
    this.store.select(fromTiming.getSelectedTrackActivity).subscribe((tActivity: TrackActivity) => {
      this.selectedTrackActivity = tActivity;

      if (tActivity) {
        this.trackActivityId = tActivity.id;
      }
    });
  }

  ngOnChanges() {
    // TODO: Scroll to selectedTrackActivity
  }

  onSelectTrackActivity(trackActivity: TrackActivity) {
    this.selectTrackActivity(trackActivity.id);
  }

  private selectTrackActivity(trackActivityId: number) {
    this.store.dispatch(new TrackActivityActions.SelectTrackActivity(trackActivityId));
  }
}
