// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as lodash from 'lodash';

// models
import { RaceParticipantTrackActivity } from '../../shared/model';

// helpers
import { TimingHelper } from './../../shared/helpers/timing.helper';

// actions
import {
  RaceParticipantTrackActivityActions
} from './../actions/';

export interface State extends EntityState<RaceParticipantTrackActivity> {
  selectedRaceParticipantTrackActivityId: string | null;
  bestRaceParticipantTrackActivityId: string | null;
}

export const adapter: EntityAdapter<RaceParticipantTrackActivity> = createEntityAdapter<RaceParticipantTrackActivity>({
  selectId: (RaceParticipanttrackActivity: RaceParticipantTrackActivity) => RaceParticipanttrackActivity.id,
  sortComparer: false,
});

export let initialState: State = adapter.getInitialState({
  selectedRaceParticipantTrackActivityId: null,
  bestRaceParticipantTrackActivityId: null
});

const timingHelper = new TimingHelper();

export function reducer(
  state = initialState,
  action:
    | RaceParticipantTrackActivityActions.ImportRaceParticipantTrackActivities
    | RaceParticipantTrackActivityActions.LoadRaceParticipantTrackActivities
    | RaceParticipantTrackActivityActions.SetBestRaceParticipantTrackActivity
): State {
  switch (action.type) {
    case RaceParticipantTrackActivityActions.RaceParticipantTrackActivityActionTypes.ImportRaceParticipantTrackActivities: {
      const newState = adapter.addAll(action.payload, state);
      const list: RaceParticipantTrackActivity[] = Object.values(newState.entities);
      const bestTrackActivity = timingHelper.getBestRaceParticipantTrackActivity(list);

      return {
        ...newState,
        bestRaceParticipantTrackActivityId: bestTrackActivity ? bestTrackActivity.id : null
      };
    }

    case RaceParticipantTrackActivityActions.RaceParticipantTrackActivityActionTypes.LoadRaceParticipantTrackActivities: {

      const newState = adapter.addAll(action.payload, state);
      const list: RaceParticipantTrackActivity[] = Object.values(newState.entities);
      const bestTrackActivity = timingHelper.getBestRaceParticipantTrackActivity(list);

      return {
        ...newState,
        bestRaceParticipantTrackActivityId: bestTrackActivity ? bestTrackActivity.id : null
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
