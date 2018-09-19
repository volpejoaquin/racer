// angular
import { Component, OnInit, OnChanges } from '@angular/core';

// models
import {
  TrackActivity,
  RaceWeekend
} from '../../../shared/model';

// dummy data
import { RACE_WEEKEND_SAMPLE } from '../../../shared/dummy';

@Component({
  selector: 'racer-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnChanges {
  raceWeekend: RaceWeekend = RACE_WEEKEND_SAMPLE;
  trackActivities: TrackActivity[];

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
