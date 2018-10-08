// libs
import { Action } from '@ngrx/store';

// models
import { TrackActivity } from '../../shared/model';

export enum TrackActivityActionTypes {
  SelectTrackActivity = '[APP] Select Track Activity',
  LoadTrackActivities = '[APP] Load Track Activities'
}

export class SelectTrackActivity implements Action {
  readonly type = TrackActivityActionTypes.SelectTrackActivity;

  constructor(public payload: number) {}
}

export class LoadTrackActivities implements Action {
  readonly type = TrackActivityActionTypes.LoadTrackActivities;

  constructor(public payload: TrackActivity[]) {}
}

export type TrackActivityActionsUnion =
  SelectTrackActivity |
  LoadTrackActivities;

