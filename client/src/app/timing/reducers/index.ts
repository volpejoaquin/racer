// libs
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

// modules
import * as fromRoot from '../../core/reducers';
import * as fromRaceWeekend from './race-weekends.reducer';
import * as fromTrackActivity from './track-activities.reducer';
import * as fromRaceParticipantTrackActivity from './race-participant-track-activities.reducer';


export interface TimingState {
  raceWeekends: fromRaceWeekend.State;
  trackActivities: fromTrackActivity.State;
  raceParticipantsTrackActivities: fromRaceParticipantTrackActivity.State;
}

export interface State extends fromRoot.State {
  timing: TimingState;
}

export const reducers: ActionReducerMap<TimingState, any> = {
  raceWeekends: fromRaceWeekend.reducer,
  trackActivities: fromTrackActivity.reducer,
  raceParticipantsTrackActivities: fromRaceParticipantTrackActivity.reducer
};

export const getTimingState = createFeatureSelector<State, TimingState>('timing');

export const getTrackActivitiesEntitiesState = createSelector(
  getTimingState,
  state => state.trackActivities
);

export const getSelectedTrackActivityId = createSelector(
  getTrackActivitiesEntitiesState,
  fromTrackActivity.getSelectedId
);

export const {
  selectIds: getTrackActivitiesIds,
  selectEntities: getTrackActivitiesEntities,
  selectAll: getAllTrackActivity,
  selectTotal: getTotalTrackActivity,
} = fromTrackActivity.adapter.getSelectors(getTrackActivitiesEntitiesState);

export const getSelectedTrackActivity = createSelector(
  getTrackActivitiesEntities,
  getSelectedTrackActivityId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getRaceWeekendsEntitiesState = createSelector(
  getTimingState,
  state => state.raceWeekends
);

export const getSelectedRaceWeekendId = createSelector(
  getRaceWeekendsEntitiesState,
  fromRaceWeekend.getSelectedId
);

export const {
  selectIds: getRaceWeekendsIds,
  selectEntities: getRaceWeekendsEntities,
  selectAll: getAllRaceWeekend,
  selectTotal: getTotalRaceWeekend,
} = fromRaceWeekend.adapter.getSelectors(getRaceWeekendsEntitiesState);

export const getRaceWeekendsState = createSelector(
  getTimingState,
  state => state.raceWeekends
);

export const getRaceWeekendsArray =
  createSelector(getRaceWeekendsState, fromRaceWeekend.getRaceWeekendsArray);

export const getSelectedRaceWeekend = createSelector(
  getRaceWeekendsEntities,
  getSelectedRaceWeekendId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getRaceParticipantsTrackActivitiesState = createSelector(
  getTimingState,
  state => state.raceParticipantsTrackActivities
);

export const getBestRaceParticipantTrackActivityId = createSelector(
  getRaceParticipantsTrackActivitiesState,
  fromRaceParticipantTrackActivity.getBestId
);

export const {
  selectIds: getRaceParticipantsTrackActivitiesIds,
  selectEntities: getRaceParticipantsTrackActivitiesEntities,
  selectAll: getAllRaceParticipantsTrackActivities,
  selectTotal: getTotalRaceParticipantsTrackActivities,
} = fromRaceParticipantTrackActivity.adapter.getSelectors(getRaceParticipantsTrackActivitiesState);

export const getRaceParticipantsTrackActivitiesArray =
  createSelector(getRaceParticipantsTrackActivitiesState, fromRaceParticipantTrackActivity.getRaceParticipantsTrackActivitiesArray);

export const getBestRaceParticipantTrackActivity = createSelector(
  getRaceParticipantsTrackActivitiesEntities,
  getBestRaceParticipantTrackActivityId,
  (entities, bestId) => {
    return bestId && entities[bestId];
  }
);

export const getTrackActivitiesState = createSelector(
  getTimingState,
  state => state.trackActivities
);

export const getSelectedTrackActivitydId = createSelector(
  getTrackActivitiesState,
  fromTrackActivity.getSelectedId
);

export const getTrackActivitiesArray =
  createSelector(getTrackActivitiesState, fromTrackActivity.getTrackActivitiesArray);
