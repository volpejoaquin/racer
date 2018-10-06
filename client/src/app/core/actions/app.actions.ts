import { Action } from '@ngrx/store';

// models
// import { State } from './../reducers/index';

export enum APPActionTypes {
  LoadInitialState = '[APP] Load Initial State'
}

export class LoadInitialState implements Action {
  readonly type = APPActionTypes.LoadInitialState;

  constructor(public payload?: any) {} // TODO: Review any model
}

export type APPActionsUnion = LoadInitialState;
