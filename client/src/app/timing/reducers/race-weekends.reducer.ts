// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as lodash from 'lodash';

// models
import { RaceWeekend } from '../../shared/model';

// actions
import {
  RaceWeekendActions
} from './../actions/';
import { RACE_WEEKENDS_SAMPLE } from '../../dummy';

export interface State extends EntityState<RaceWeekend> {
  selectedRaceWeekendId: string | null;
}

export const adapter: EntityAdapter<RaceWeekend> = createEntityAdapter<RaceWeekend>({
  selectId: (raceWeekend: RaceWeekend) => raceWeekend.id,
  sortComparer: false
});

export let initialState: State = adapter.getInitialState({
  selectedRaceWeekendId: null
});

initialState = adapter.addAll(RACE_WEEKENDS_SAMPLE, initialState); // TODO: REVIEW THIS

export function reducer(
  state = initialState,
  action:
    | RaceWeekendActions.SelectRaceWeekend
    | RaceWeekendActions.LoadRaceWeekends
): State {
  switch (action.type) {
    case RaceWeekendActions.RaceWeekendActionTypes.SelectRaceWeekend: {
      return {
        ...state,
        selectedRaceWeekendId: action.payload
      };
    }

    case RaceWeekendActions.RaceWeekendActionTypes.LoadRaceWeekends: {

      const newState = adapter.addAll(action.payload, state);
      const list: RaceWeekend[] = Object.values(newState.entities);
      const selectedRaceWeekendId =  list && list.length > 0 ? list[0].id : null;

      return {
        ...newState,
        selectedRaceWeekendId: selectedRaceWeekendId
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedRaceWeekendId;
export const getRaceWeekendsArray = (state: State) => lodash.map(state.ids, (id: any) => state.entities[id]);
