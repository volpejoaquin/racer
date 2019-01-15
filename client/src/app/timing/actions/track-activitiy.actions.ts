// libs
import { Action } from '@ngrx/store';

// models
import { TrackActivity, TrackActivityState } from '../../shared/model';

export enum TrackActivityActionTypes {
  SelectTrackActivity = '[APP] Select Track Activity',
  LoadTrackActivities = '[APP] Load Track Activities',
  ChangeStateSelectedTrackActivity = '[APP] Change State Selected Track Activity'
}

export class SelectTrackActivity implements Action {
  readonly type = TrackActivityActionTypes.SelectTrackActivity;

  constructor(public payload: string) {}
}

export class LoadTrackActivities implements Action {
  readonly type = TrackActivityActionTypes.LoadTrackActivities;

  constructor(public payload: TrackActivity[]) {}
}

export class ChangeStateSelectedTrackActivity implements Action {
  readonly type = TrackActivityActionTypes.ChangeStateSelectedTrackActivity;

  constructor(public payload: TrackActivityState) {}
}

export type TrackActivityActionsUnion =
  SelectTrackActivity |
  LoadTrackActivities |
  ChangeStateSelectedTrackActivity
;

