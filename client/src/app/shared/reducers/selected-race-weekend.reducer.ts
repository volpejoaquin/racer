// models
import { RaceWeekend } from '../model';

// actions
import { Actions, SELECT_RACE_WEEKEND } from './../actions/race-weekend.actions';

// dummy data
import { RACE_WEEKEND_SAMPLE } from '../dummy';

const initialState: RaceWeekend = RACE_WEEKEND_SAMPLE;

export function selectedRaceWeekedReducer(
  state: RaceWeekend = initialState,
  action: Actions) {

  switch (action.type) {
    case SELECT_RACE_WEEKEND:
      return action.payload ? action.payload : state;

    default:
      return state;
  }
}
