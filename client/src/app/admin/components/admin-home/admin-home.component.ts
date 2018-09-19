// angular
import { Component, OnInit, OnChanges } from '@angular/core';

// libs
import * as lodash from 'lodash';

// models
import {
  TrackActivity
} from '../../../shared/model';

// dummy data
import { TRACK_ACTIVITIES_SAMPLE } from '../../../shared/dummy';

@Component({
  selector: 'racer-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnChanges {
  trackActivities: TrackActivity[];
  selectedTrackActivity: TrackActivity;

  ngOnInit() {

    // TODO: Dummy data
    this.trackActivities = lodash.clone(TRACK_ACTIVITIES_SAMPLE);
    this.selectedTrackActivity = this.trackActivities[0];
  }

  ngOnChanges() {
    // TODO: Scroll to selectedTrackActivity
  }
}
