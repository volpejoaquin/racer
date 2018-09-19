// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// models
import { AppState } from './../../../app-state';
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

  constructor(store: Store<AppState>) {
    store.select('selected_track_activity').subscribe((tActivity: TrackActivity) => {
      this.selectedTrackActivity = tActivity;
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {

    if (this.raceWeekend) {
      this.selectedTrackActivity = this.raceWeekend.track_activities[0];
    }
  }
}
