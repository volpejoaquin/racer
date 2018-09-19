// angular
import { Component, Input, OnChanges } from '@angular/core';

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
  @Input() selectedTrackActivity: TrackActivity;

  constructor() { }

  ngOnChanges() {
    // TODO: Scroll to selectedTrackActivity
  }
}
