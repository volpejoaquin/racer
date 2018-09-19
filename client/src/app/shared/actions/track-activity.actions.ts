// libs
import { Action } from '@ngrx/store';

// models
import { TrackActivity } from '../model';

export const SELECT_TRACK_ACTIVITY = 'Select_track_activity';

export class SelectTrackActivity implements Action {
    readonly type = SELECT_TRACK_ACTIVITY;

    constructor(public payload: TrackActivity) { }
}

export type Actions = SelectTrackActivity;
