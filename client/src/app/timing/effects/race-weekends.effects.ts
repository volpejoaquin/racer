// libraries
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as lodash from 'lodash';

// store
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RaceWeekendActions, TrackActivityActions } from "../actions";

// models
import { RaceWeekend, TrackActivity } from "../../shared/model";

// dummy
import { RACE_WEEKENDS_SAMPLE } from "../../dummy";

@Injectable()
export class RaceWeekendsEffects {

  constructor(
    private actions$: Actions
  ) {}

  @Effect()
  selectRaceWeekend$: Observable<Action> = this.actions$.pipe(
    ofType<RaceWeekendActions.LoadRaceWeekends>(RaceWeekendActions.RaceWeekendActionTypes.LoadRaceWeekends),
    map((action: RaceWeekendActions.LoadRaceWeekends) => action.payload),
    map((payload: RaceWeekend[]) => {
      let raceWeekendId = null;
      
      if (payload && payload.length > 1 && payload[0]) {
        raceWeekendId = payload[0].id;
      }
      return new RaceWeekendActions.SelectRaceWeekend(raceWeekendId);
    })
  );

  @Effect()
  loadTrackActivities$: Observable<Action> = this.actions$.pipe(
    ofType<RaceWeekendActions.SelectRaceWeekend>(RaceWeekendActions.RaceWeekendActionTypes.SelectRaceWeekend),
    map((action: RaceWeekendActions.SelectRaceWeekend) => action.payload),
    map((selectedRaceWeekendId: string) => {
      let trackActivities: TrackActivity[] = [];

      if (selectedRaceWeekendId) {
        const selectedRaceWeekend: RaceWeekend = lodash.find(RACE_WEEKENDS_SAMPLE, { id: selectedRaceWeekendId });

        if (selectedRaceWeekend) {
          trackActivities = selectedRaceWeekend.track_activities;
        }
      }
      return new TrackActivityActions.LoadTrackActivities(trackActivities);
    })
  );
}
