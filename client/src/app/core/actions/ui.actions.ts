// libs
import { Action } from '@ngrx/store';

export const SET_SOCKET_CONECTED = '[UI] Set Socket Connected';
export const SHOW_RACE_PARTICIPANT = '[UI] Show Race Participant';
export const HIDE_RACE_PARTICIPANT = '[UI] Hide Race Participant';
export const DIM_RACE_PARTICIPANT = '[UI] Dim Race Participant';

export class SetSocketConnected implements Action {
  readonly type = SET_SOCKET_CONECTED;
  constructor(public payload?: boolean) {}
}

export class ShowRaceParticipant implements Action {
  readonly type = SHOW_RACE_PARTICIPANT;
  constructor(public payload?: number) {}
}

export class HideRaceParticipant implements Action {
  readonly type = HIDE_RACE_PARTICIPANT;
  constructor(public payload?: number) {}
}

export class DimRaceParticipant implements Action {
  readonly type = DIM_RACE_PARTICIPANT;
  constructor(public payload?: number) {}
}

export type All =
  SetSocketConnected |
  ShowRaceParticipant |
  HideRaceParticipant |
  DimRaceParticipant;
