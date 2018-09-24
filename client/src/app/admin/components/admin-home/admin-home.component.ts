// angular
import { Component, OnInit, OnChanges } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

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
    store.pipe(select(fromTiming.getSelectedRaceWeekend)).subscribe((rWeekend: RaceWeekend) => {
      this.raceWeekend = rWeekend;
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
