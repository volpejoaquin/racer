// libs
import { Action } from '@ngrx/store';

export enum TrackActivityActionTypes {
  SelectTrackActivity = '[APP] Select Track Activity'
}

export class SelectTrackActivity implements Action {
  readonly type = TrackActivityActionTypes.SelectTrackActivity;

  constructor(public payload: number) {}
}

export type TrackActivityActionsUnion = SelectTrackActivity;

