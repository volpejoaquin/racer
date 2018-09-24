// angular
import { Component, OnInit, OnChanges } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// modules
import * as fromTiming from './../../../timing/reducers/';

// models
import {
  RaceWeekend
} from '../../../shared/model';

@Component({
  selector: 'racer-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnChanges {
  raceWeekend: RaceWeekend;

  constructor(store: Store<fromTiming.State>) {
    store.subscribe((state: any) => {
      console.log(state);
      // // Check if selected race weekend is set
      // if (state.timing.selected_race_weekend) {
      //   this.raceWeekend = state.timing.selected_race_weekend;
      // }
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
