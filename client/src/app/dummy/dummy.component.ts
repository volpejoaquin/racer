import { LoadRaceWeekends } from './../timing/actions/race-weekend.actions';
// angular
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, toArray } from 'rxjs/operators';
import { Database } from '@ngrx/db';

// store
import * as fromRoot from './../core/reducers/';
import * as fromTiming from './../timing/reducers/';
import {
  LoadRaceParticipantTrackActivities,
  SetBestRaceParticipantTrackActivity
} from './../timing/actions/race-participant-track-activity.actions';

// models
import {
  IRaceWeekend,
  RaceParticipantTrackActivity
} from './../shared/model';

@Component({
  selector: 'racer-dummy',
  template: ``
})
export class DummyComponent implements OnInit {

  private raceWeekends: IRaceWeekend[];

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
            this.raceWeekends = raceWeekends;
            this.store.dispatch(new LoadRaceWeekends(raceWeekends));
          }
        ),
        catchError((res: any) => {
          console.log('ERROR', res);
          return of(false);
        })
      ).subscribe();
    });

    const raceParticipantsTrackActivities$ = this.store.pipe(select(fromTiming.getRaceParticipantsTrackActivitiesArray));
    raceParticipantsTrackActivities$.subscribe((_raceParticipantsTrackActivities: RaceParticipantTrackActivity[]) => {

      this.db.insert('race_weekends', this.raceWeekends).subscribe();
    });
  }
}
