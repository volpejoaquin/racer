// libs
import { Action } from '@ngrx/store';

// models
import { RaceWeekend } from '../model';

export const SELECT_RACE_WEEKEND = 'Select_race_weeked';

export class SelectRaceweekend implements Action {
    readonly type = SELECT_RACE_WEEKEND;

    constructor(public payload: RaceWeekend) { }
}

export type Actions = SelectRaceweekend;
