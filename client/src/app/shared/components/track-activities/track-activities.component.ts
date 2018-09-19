// angular
import { Component, Input, OnChanges } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// models
import { AppState } from './../../../app-state';
import {
  TrackActivity
} from '../../../shared/model/';

// actions
import { SelectTrackActivity } from '../../actions/track-activity.actions';

@Component({
  selector: 'racer-track-activities',
  templateUrl: './track-activities.component.html',
  styleUrls: ['./track-activities.component.scss']
})
export class TrackActivitiesComponent implements OnChanges {
  @Input() trackActivities: TrackActivity[];
  selectedTrackActivity: TrackActivity;

  constructor(private store: Store<AppState>) { }

  ngOnChanges() {
    // TODO: Scroll to selectedTrackActivity

    if (this.trackActivities && this.trackActivities.length > 0) {
      this.selectTrackActivity(this.trackActivities[0]);
    }
  }

  onSelectTrackActivity(trackActivity: TrackActivity) {
    this.selectTrackActivity(trackActivity);
  }

  private selectTrackActivity(trackActivity: TrackActivity) {
    this.selectedTrackActivity = trackActivity;

    this.store.dispatch(new SelectTrackActivity(trackActivity));
  }
}
