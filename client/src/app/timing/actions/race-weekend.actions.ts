// libs
import { Action } from '@ngrx/store';

export enum RaceWeekendActionTypes {
  SelectRaceWeekend = '[APP] Select Race Weekend'
}

export class SelectRaceWeekend implements Action {
  readonly type = RaceWeekendActionTypes.SelectRaceWeekend;

  constructor(public payload: number) {}
}

export type RaceWeekendActionsUnion = SelectRaceWeekend;