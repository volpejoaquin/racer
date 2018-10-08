import { LoadRaceWeekends } from './../timing/actions/race-weekend.actions';
// angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, toArray } from 'rxjs/operators';
import { Database } from '@ngrx/db';

// store
import * as fromRoot from './../core/reducers/';
import {
  LoadRaceParticipantTrackActivities,
  SetBestRaceParticipantTrackActivity
} from './../timing/actions/race-participant-track-activity.actions';

// models
import { IRaceWeekend } from './../shared/model';

// dummy data
// import { RACE_WEEKENDS_SAMPLE } from './../shared/dummy';

@Component({
  selector: 'racer-dummy',
  template: ``
})
export class DummyComponent implements OnInit {
  constructor(
    private store: Store<fromRoot.State>,
    private db: Database) {
  }

  ngOnInit() {
    this.db.open('racer_app').subscribe((response: any) => {
      console.log('[DATABASE INFO] ', response);

      this.db.query('race_weekends').pipe(
        toArray(),
        map(
          (raceWeekends: IRaceWeekend[]) => {
            this.store.dispatch(new LoadRaceWeekends(raceWeekends));
          }
        ),
        catchError((res: any) => {
          console.log('response', res);
          return of(false);
        })
      ).subscribe();
    });
  }
}
