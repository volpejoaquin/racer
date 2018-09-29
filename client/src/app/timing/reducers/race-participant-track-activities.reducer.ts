// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as lodash from 'lodash';

// models
import { RaceParticipantTrackActivity } from '../../shared/model';

// actions
import {
  RaceParticipantTrackActivityActions
} from './../actions/';

export interface State extends EntityState<RaceParticipantTrackActivity> {
  selectedRaceParticipantTrackActivityId: number | null;
  bestRaceParticipantTrackActivityId: number | null;
}

export const adapter: EntityAdapter<RaceParticipantTrackActivity> = createEntityAdapter<RaceParticipantTrackActivity>({
  selectId: (RaceParticipanttrackActivity: RaceParticipantTrackActivity) => RaceParticipanttrackActivity.id,
  sortComparer: false,
});

export let initialState: State = adapter.getInitialState({
  selectedRaceParticipantTrackActivityId: 1,
  bestRaceParticipantTrackActivityId: 1
});

export function reducer(
  state = initialState,
  action:
    | RaceParticipantTrackActivityActions.LoadRaceParticipantTrackActivities
    | RaceParticipantTrackActivityActions.SetBestRaceParticipantTrackActivity
): State {
  switch (action.type) {
    case RaceParticipantTrackActivityActions.RaceParticipantTrackActivityActionTypes.LoadRaceParticipantTrackActivities: {

      const newState = adapter.addAll(action.payload, state);

      return {
        ...newState,
        bestRaceParticipantTrackActivityId: newState.ids[0] as number
      };
    }

    case RaceParticipantTrackActivityActions.RaceParticipantTrackActivityActionTypes.SetBestRaceParticipantTrackActivity: {
      return {
        ...state,
        bestRaceParticipantTrackActivityId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedRaceParticipantTrackActivityId;
export const getBestId = (state: State) => state.bestRaceParticipantTrackActivityId;
export const getRaceParticipantsTrackActivitiesArray = (state: State) => lodash.map(state.ids, (id: any) => state.entities[id]);
