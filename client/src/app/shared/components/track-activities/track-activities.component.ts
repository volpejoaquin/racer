// angular
import { Component, Input, OnChanges } from '@angular/core';

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
export class TrackActivitiesComponent implements OnChanges {
  @Input() trackActivities: TrackActivity[];
  selectedTrackActivity: TrackActivity;

  constructor(private store: Store<fromTiming.State>) { }

  ngOnChanges() {
    // TODO: Scroll to selectedTrackActivity
  }

  onSelectTrackActivity(trackActivity: TrackActivity) {
    this.selectTrackActivity(trackActivity);
  }

  private selectTrackActivity(trackActivity: TrackActivity) {
    this.selectedTrackActivity = trackActivity;

    this.store.dispatch(new TrackActivityActions.SelectTrackActivity(trackActivity.id));
  }
}
