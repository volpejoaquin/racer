// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// models
import { RaceWeekend } from '../../shared/model';

// actions
import {
  RaceWeekendActions
} from './../actions/';

// dummy data
import { RACE_WEEKEND } from '../../shared/dummy';

export interface State extends EntityState<RaceWeekend> {
  selectedRaceWeekendId: number | null;
}

export const adapter: EntityAdapter<RaceWeekend> = createEntityAdapter<RaceWeekend>({
  selectId: (raceWeekend: RaceWeekend) => raceWeekend.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedRaceWeekendId: null,
});

export function reducer(
  state = initialState,
  action:
    | RaceWeekendActions.SelectRaceWeekend
): State {
  switch (action.type) {
    case RaceWeekendActions.RaceWeekendActionTypes.SelectRaceWeekend: {
      return {
        ...state,
        selectedRaceWeekendId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedRaceWeekendId;
