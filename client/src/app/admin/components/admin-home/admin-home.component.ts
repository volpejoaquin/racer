// angular
import { Component, OnInit, OnChanges } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

// modules
import * as fromTiming from './../../../timing/reducers/';

// models
import {
  IRaceWeekend
} from '../../../shared/model';

@Component({
  selector: 'racer-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnChanges {
  raceWeekend: IRaceWeekend;

  constructor(private store: Store<fromTiming.State>) {
  }

  ngOnInit() {
    this.store.select(fromTiming.getSelectedRaceWeekend).subscribe((rWeekend: IRaceWeekend) => {
      this.raceWeekend = rWeekend;
    });
  }

  ngOnChanges() {
  }
}
