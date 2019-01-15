// libs
import { Action } from '@ngrx/store';

// models
import { RaceWeekend } from '../../shared/model';

export enum RaceWeekendActionTypes {
  SelectRaceWeekend = '[APP] Select Race Weekend',
  LoadRaceWeekends = '[APP] Load Race Weekends'
}

export class SelectRaceWeekend implements Action {
  readonly type = RaceWeekendActionTypes.SelectRaceWeekend;

  constructor(public payload: string) {}
}

export class LoadRaceWeekends implements Action {
  readonly type = RaceWeekendActionTypes.LoadRaceWeekends;

  constructor(public payload: RaceWeekend[]) {}
}

export type RaceWeekendActionsUnion = SelectRaceWeekend;
