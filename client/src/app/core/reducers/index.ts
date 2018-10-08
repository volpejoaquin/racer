// libs
import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as lodash from 'lodash';

// modules
import * as fromUI from './ui.reducer';
import * as fromLayout from './layout.reducer';

// actions
import { APPActionTypes } from './../actions/app.actions';

export interface State {
  ui: fromUI.State;
  layout: fromLayout.State;
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', lodash.clone(state));
    console.log('action', action);
    console.log('next state', lodash.clone(result));
    console.groupEnd();

    return result;
  };
}

export function stateSetter(r: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
    if (action.type === APPActionTypes.LoadInitialState) {
      return {
        ...state,
        ...action.payload
      };
    }
    return r(state, action);
  };
}

export const reducers: ActionReducerMap<State, any> = {
  ui: fromUI.reducer,
  layout: fromLayout.reducer
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] =  !environment.production
  ? [logger, stateSetter]
  : [stateSetter];

export const getUIState = createFeatureSelector<fromUI.State>('ui');

export const getSocketStatus = createSelector(getUIState, fromUI.getSocketStatusState);
export const getRaceParticipants = createSelector(getUIState, fromUI.getRaceParticipantsState);
