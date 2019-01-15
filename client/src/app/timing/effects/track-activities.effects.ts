// libraries
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as lodash from 'lodash';

// store
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RaceWeekendActions, TrackActivityActions, RaceParticipantTrackActivityActions } from "../actions";

// models
import { RaceWeekend, TrackActivity, RaceParticipantTrackActivity } from "../../shared/model";

// dummy
import { TRACK_ACTIVITIES_SAMPLE } from "../../dummy";

@Injectable()
export class TrackActivitiesEffects {

  constructor(
    private actions$: Actions
  ) {}

  @Effect()
  selectRaceWeekend$: Observable<Action> = this.actions$.pipe(
    ofType<TrackActivityActions.LoadTrackActivities>(TrackActivityActions.TrackActivityActionTypes.LoadTrackActivities),
    map((action: TrackActivityActions.LoadTrackActivities) => action.payload),
    map((payload: TrackActivity[]) => {
      let trackActivityId = null;
      
      if (payload && payload.length > 1 && payload[0]) {
        trackActivityId = payload[0].id;
      }
      return new TrackActivityActions.SelectTrackActivity(trackActivityId);
    })
  );

  @Effect()
  loadRaceParticipantTrackActivities$: Observable<Action> = this.actions$.pipe(
    ofType<TrackActivityActions.SelectTrackActivity>(TrackActivityActions.TrackActivityActionTypes.SelectTrackActivity),
    map((action: TrackActivityActions.SelectTrackActivity) => action.payload),
    map((selectedTrackActivityId: string) => {
      let raceParticipantTrackActivities: RaceParticipantTrackActivity[] = [];

      if (selectedTrackActivityId) {
        const selectedTrackActivity: TrackActivity = lodash.find(TRACK_ACTIVITIES_SAMPLE, { id: selectedTrackActivityId});

        if (selectedTrackActivity) {
          raceParticipantTrackActivities = selectedTrackActivity.race_participants_track_activities;
        }
      }
      return new RaceParticipantTrackActivityActions.LoadRaceParticipantTrackActivities(raceParticipantTrackActivities);
    })
  );
}
