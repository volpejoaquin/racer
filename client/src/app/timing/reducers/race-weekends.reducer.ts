// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// models
import { IRaceWeekend } from '../../shared/model';

// actions
import {
  RaceWeekendActions
} from './../actions/';
import { RACE_WEEKENDS_SAMPLE } from '../../shared/dummy';

export interface State extends EntityState<IRaceWeekend> {
  selectedRaceWeekendId: number | null;
}

export const adapter: EntityAdapter<IRaceWeekend> = createEntityAdapter<IRaceWeekend>({
  selectId: (raceWeekend: IRaceWeekend) => raceWeekend.id,
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
