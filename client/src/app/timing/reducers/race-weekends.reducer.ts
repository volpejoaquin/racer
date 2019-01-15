// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as lodash from 'lodash';

// models
import { RaceWeekend } from '../../shared/model';

// actions
import {
  RaceWeekendActions
} from './../actions/';

export interface State extends EntityState<RaceWeekend> {
  selectedRaceWeekendId: string | null;
}

export const adapter: EntityAdapter<RaceWeekend> = createEntityAdapter<RaceWeekend>({
  selectId: (raceWeekend: RaceWeekend) => raceWeekend.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedRaceWeekendId: null
});

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
      return adapter.addAll(action.payload, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedRaceWeekendId;
export const getRaceWeekendsArray = (state: State) => lodash.map(state.ids, (id: any) => state.entities[id]);
