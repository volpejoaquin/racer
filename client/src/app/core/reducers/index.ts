// libs
import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
// import * as fromRouter from '@ngrx/router-store';

// modules
import * as fromUI from './ui.reducer';
import * as fromLayout from './layout.reducer';

export interface State {
  ui: fromUI.State;
  layout: fromLayout.State;
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
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
  ? [logger]
  : []; // TODO: ADD storeFreeze

export const getUIState = createFeatureSelector<fromUI.State>('ui');

export const getSocketStatus = createSelector(getUIState, fromUI.getSocketStatus);
