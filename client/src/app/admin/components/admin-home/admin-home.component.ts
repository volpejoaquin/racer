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

@Component({
  selector: 'racer-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnChanges {
  raceWeekend: RaceWeekend;

  constructor(store: Store<AppState>) {
    store.select('selected_race_weekend').subscribe((rWeekend: RaceWeekend) => {
      this.raceWeekend = rWeekend;
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
