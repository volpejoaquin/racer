// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as lodash from 'lodash';

// models
import { RaceParticipantTrackActivity } from '../../shared/model';

// actions
import {
  RaceParticipantTrackActivityActions
} from './../actions/';

// dummy data
import { TP_C3_TRACK_ACTIVITY } from '../../shared/dummy';

export interface State extends EntityState<RaceParticipantTrackActivity> {
  selectedRaceParticipantTrackActivityId: number | null;
}

export const adapter: EntityAdapter<RaceParticipantTrackActivity> = createEntityAdapter<RaceParticipantTrackActivity>({
  selectId: (RaceParticipanttrackActivity: RaceParticipantTrackActivity) => RaceParticipanttrackActivity.id,
  sortComparer: false,
});

export let initialState: State = adapter.getInitialState({
  selectedRaceParticipantTrackActivityId: 1
});

initialState = adapter.addAll(TP_C3_TRACK_ACTIVITY.race_participants_track_activities, initialState); // TODO: REVIEW THIS

export function reducer(
  state = initialState,
  action:
    | RaceParticipantTrackActivityActions.LoadRaceParticipantTrackActivities
): State {
  switch (action.type) {
    case RaceParticipantTrackActivityActions.RaceParticipantTrackActivityActionTypes.LoadRaceParticipantTrackActivities: {

      const newState = adapter.addAll(action.payload, state);

      return newState;
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedRaceParticipantTrackActivityId;
export const getRaceParticipantsTrackActivitiesArray = (state: State) => lodash.map(state.ids, (id: any) => state.entities[id]);
