// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// modules
import * as fromTiming from '../../../timing/reducers';

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

  selectedTrackActivity: TrackActivity;

  constructor(store: Store<fromTiming.State>) {
    store.select('selected_track_activity').subscribe((tActivity: TrackActivity) => {
      this.selectedTrackActivity = tActivity;
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
