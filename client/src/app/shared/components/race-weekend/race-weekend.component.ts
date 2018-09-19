// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// libs
import * as lodash from 'lodash';

// models
import {
  RaceWeekend,
  TrackActivity
} from '../../../shared/model';

// dummy data

@Component({
  selector: 'racer-race-weekend',
  templateUrl: './race-weekend.component.html',
  styleUrls: ['./race-weekend.component.scss']
})
export class RaceWeekendComponent implements OnInit, OnChanges {
  @Input() raceWeekend: RaceWeekend;

  private selectedTrackActivity: TrackActivity;

  ngOnInit() {
  }

  ngOnChanges() {

    if (this.raceWeekend) {
      this.selectedTrackActivity = this.raceWeekend.track_activities[0];
    }
  }
}
