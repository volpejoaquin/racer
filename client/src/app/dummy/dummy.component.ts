// angular
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, toArray } from 'rxjs/operators';
import { Database } from '@ngrx/db';
import * as lodash from 'lodash';

// store
import * as fromRoot from './../core/reducers/';
import * as fromTiming from './../timing/reducers/';
import {
  LoadRaceParticipantTrackActivities,
  SetBestRaceParticipantTrackActivity
} from './../timing/actions/race-participant-track-activity.actions';
import { LoadRaceWeekends } from './../timing/actions/race-weekend.actions';
import { LoadTrackActivities } from './../timing/actions/track-activitiy.actions';

// models
import {
  IRaceWeekend,
  TrackActivity,
  RaceParticipantTrackActivity
} from './../shared/model';

// dummy data
import { RACE_WEEKENDS_SAMPLE } from '../shared/dummy';

@Component({
  selector: 'racer-dummy',
  template: ``
})
export class DummyComponent implements OnInit {

  private raceWeekends: IRaceWeekend[];
  private trackActivities: TrackActivity[];

  private raceWeekend$: Observable<IRaceWeekend>;

  constructor(
    private store: Store<fromRoot.State>,
    private db: Database) {
  }

  ngOnInit() {
    this.db.open('racer_app').subscribe((response: any) => {
      console.log('[DATABASE INFO] ', response);

      // TODO: REMOVE THIS
      const reload = true;

      if (reload) {
        this.raceWeekends = RACE_WEEKENDS_SAMPLE;
        this.db.insert('race_weekends', this.raceWeekends).pipe(
          toArray(),
          map(
            (raceWeekends: IRaceWeekend[]) => {
              this.loadRaceWeekends(raceWeekends);
            }
          ),
          catchError((res: any) => {
            console.log('ERROR', res);
            return of(false);
          })
        ).subscribe();
      } else {
        this.db.query('race_weekends').pipe(
          toArray(),
          map(
            (raceWeekends: IRaceWeekend[]) => {
              this.loadRaceWeekends(raceWeekends);
            }
          ),
          catchError((res: any) => {
            console.log('ERROR', res);
            return of(false);
          })
        ).subscribe();
        }
    });

    this.raceWeekend$ = this.store.pipe(select(fromTiming.getSelectedRaceWeekend));
    this.raceWeekend$.subscribe((selectedRaceWeekend: IRaceWeekend) => {

      if (selectedRaceWeekend) {
        const trackActivities: TrackActivity[] = this.getTrackActivities(selectedRaceWeekend);
        this.loadTrackActivities(trackActivities);
      }
    });

    const raceParticipantsTrackActivities$ = this.store.pipe(select(fromTiming.getRaceParticipantsTrackActivitiesArray));
    raceParticipantsTrackActivities$.subscribe((_raceParticipantsTrackActivities: RaceParticipantTrackActivity[]) => {

      if (this.raceWeekends) {
        this.db.insert('race_weekends', this.raceWeekends).subscribe();
      }
    });
  }

  private loadRaceWeekends(raceWeekends: IRaceWeekend[]) {
    this.raceWeekends = raceWeekends;

    // const raceWeekendsCopy: IRaceWeekend[] = [];
    // let raceWeekend: IRaceWeekend;

    // raceWeekends.forEach((rWeekend: IRaceWeekend) => {
      // raceWeekend = lodash.clone(rWeekend);
      // delete raceWeekend.track_activities; TODO: REVIEW THIS
      // raceWeekendsCopy.push(raceWeekend);
    // });
    this.store.dispatch(new LoadRaceWeekends(raceWeekends));
  }

  private loadTrackActivities(trackActivities: TrackActivity[]) {
    this.trackActivities = trackActivities;

    // const trackActivitiesCopy: TrackActivity[] = [];
    // let trackActivity: TrackActivity;

    // trackActivities.forEach((tActivity: TrackActivity) => {
      // trackActivity = lodash.clone(tActivity);
      // trackActivity.race_participants_track_activities = []; TODO: REVIEW THIS
      // trackActivitiesCopy.push(trackActivity);
    // });
    this.store.dispatch(new LoadTrackActivities(trackActivities));
  }

  private getTrackActivities(raceWeekend: IRaceWeekend) {
    const rWeekend: IRaceWeekend = lodash.find(this.raceWeekends, (rW: IRaceWeekend) => {
      return rW.id === raceWeekend.id;
    });
    return rWeekend && rWeekend.track_activities ? rWeekend.track_activities : [];
  }
}
