// angular
import { Component, OnInit, OnChanges } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// models
import { AppState } from './../../../app-state';
import {
  RaceWeekend
} from '../../../shared/model';

// actions
import { SelectRaceweekend } from './../../../shared/actions/race-weekend.actions';

// dummy data
import { RACE_WEEKEND_SAMPLE } from '../../../shared/dummy';

@Component({
  selector: 'racer-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnChanges {
  raceWeekend: RaceWeekend = RACE_WEEKEND_SAMPLE;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(new SelectRaceweekend(null));
  }

  ngOnChanges() {
  }
}
