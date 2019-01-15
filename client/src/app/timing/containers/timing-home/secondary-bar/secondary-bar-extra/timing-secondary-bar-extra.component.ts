// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

// modules
import * as fromTiming from './../../../../../timing/reducers';

// actions
import { RaceParticipantTrackActivityActions } from './../../../../../timing/actions';

// models
import {
  RaceWeekend,
  TrackActivity,
  RaceParticipantTrackActivity
} from './../../../../../shared/model';
import { Observable } from 'rxjs';

// dummy data

@Component({
  selector: 'racer-timing-secondary-bar-extra',
  templateUrl: './timing-secondary-bar-extra.component.html',
  styleUrls: ['./timing-secondary-bar-extra.component.scss']
})
export class TimingSecondaryBarExtraComponent implements OnInit, OnChanges {
  raceWeekends$: Observable<RaceWeekend[]>;
  trackActivities$: Observable<TrackActivity>;

  selectedRaceWeekend: RaceWeekend;
  selectedTrackActivity: TrackActivity;

  constructor(private store: Store<fromTiming.State>) {
  }

  ngOnInit() {
    this.store.select(fromTiming.getSelectedRaceWeekend).subscribe((rWeekend: RaceWeekend) => {
      this.selectedRaceWeekend = rWeekend;
    });
    this.store.select(fromTiming.getSelectedTrackActivity).subscribe((tActivity: TrackActivity) => {
      this.selectedTrackActivity = tActivity;
    });

    this.raceWeekends$ = this.store.pipe(select(fromTiming.getRaceWeekendsArray));
    this.trackActivities$ = this.store.pipe(select(fromTiming.getTrackActivitiesArray));
  }

  ngOnChanges() {
  }

  onRaceParticipantsTrackActivitiesLoaded(raceParticipantsTrackActivites: RaceParticipantTrackActivity[]) {
    this.store.dispatch(new RaceParticipantTrackActivityActions.ImportRaceParticipantTrackActivities(raceParticipantsTrackActivites));
  }
}
