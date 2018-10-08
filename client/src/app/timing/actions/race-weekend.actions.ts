// libs
import { Action } from '@ngrx/store';

// models
import { IRaceWeekend } from '../../shared/model';

export enum RaceWeekendActionTypes {
  SelectRaceWeekend = '[APP] Select Race Weekend',
  LoadRaceWeekends = '[APP] Load Race Weekends'
}

export class SelectRaceWeekend implements Action {
  readonly type = RaceWeekendActionTypes.SelectRaceWeekend;

  constructor(public payload: number) {}
}

export class LoadRaceWeekends implements Action {
  readonly type = RaceWeekendActionTypes.LoadRaceWeekends;

  constructor(public payload: IRaceWeekend[]) {}
}

export type RaceWeekendActionsUnion = SelectRaceWeekend;
