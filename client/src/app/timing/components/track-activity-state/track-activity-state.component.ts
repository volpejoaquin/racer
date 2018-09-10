// angular
import { Component } from '@angular/core';

// libs
import * as moment from 'moment';

// models
import {
  TrackActivity,
  TrackActivityState
} from '../../../shared/model';

// dummy daata
import { TRACK_ACTIVITY } from '../../../shared/dummy';

@Component({
  selector: 'racer-track-activity-state',
  templateUrl: './track-activity-state.component.html',
  styleUrls: ['./track-activity-state.component.css']
})
export class TrackActivityStateComponent {
  trackActivity: TrackActivity = TRACK_ACTIVITY;
  trackActivityStates = TrackActivityState;

  constructor() { }
}
