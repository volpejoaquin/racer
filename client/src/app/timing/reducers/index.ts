// libs
import {
  ActionReducerMap
} from '@ngrx/store';
// import * as fromRouter from '@ngrx/router-store';

// modules
import * as fromRoot from '../../reducers';
import * as fromRaceWeekend from './race-weekends.reducer';
import * as fromTrackActivity from './track-activities.reducer';


export interface TimingState {
  raceWeekends: fromRaceWeekend.State;
  trackActivities: fromTrackActivity.State;
}

export interface State extends fromRoot.State {
  timing: TimingState;
}

export const reducers: ActionReducerMap<TimingState, any> = {
  raceWeekends: fromRaceWeekend.reducer,
  trackActivities: fromTrackActivity.reducer

  // search: fromSearch.reducer,
  // books: fromBooks.reducer,
  // collection: fromCollection.reducer

  // selectedRaceWeekendId: fromRaceWeekend.reducer,
  // selectedTrackActivityId: fromTrackActivity.reducer
};


// export interface State {
//   raceWeekends: RaceWeekendsState;
//   trackActivities: TrackActivitiesState;

//   selectedRaceWeekendId: fromRaceWeekend.State;
//   selectedTrackActivityId: fromTrackActivity.State;
// }

// export const reducers: ActionReducerMap<State> = {
//   selectedRaceWeekend: fromRaceWeekend.reducer,
//   selectedTrackActivity: fromTrackActivity.reducer
// };

