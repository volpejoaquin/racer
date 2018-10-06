// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as lodash from 'lodash';

// helpers
import { TimingHelper } from './../../shared/helpers/timing.helper';

// models
import {
  TrackActivity
} from '../../shared/model';

// actions
import {
  TrackActivityActions,
  RaceParticipantTrackActivityActions
} from './../actions/';

// dummy data
import { TP_C3_TRACK_ACTIVITIES } from '../../shared/dummy';

export interface State extends EntityState<TrackActivity> {
  selectedTrackActivityId: number | null;
}

export const adapter: EntityAdapter<TrackActivity> = createEntityAdapter<TrackActivity>({
  selectId: (trackActivity: TrackActivity) => trackActivity.id,
  sortComparer: false,
});

export let initialState: State = adapter.getInitialState({
  selectedTrackActivityId: null
});

const timingHelper = new TimingHelper();

export function reducer(
  state = initialState,
  action:
    | TrackActivityActions.SelectTrackActivity
    | RaceParticipantTrackActivityActions.ImportRaceParticipantTrackActivities
): State {
  switch (action.type) {
    case TrackActivityActions.TrackActivityActionTypes.SelectTrackActivity: {
      return {
        ...state,
        selectedTrackActivityId: action.payload
      };
    }

    case RaceParticipantTrackActivityActions.RaceParticipantTrackActivityActionTypes.ImportRaceParticipantTrackActivities: {

      const newState = Object.assign({}, state);

      const selectedTrackActivityId = newState.selectedTrackActivityId,
        selectedTrackActivity = newState.entities[selectedTrackActivityId];

      let trackActivityIds = [selectedTrackActivity.id],
        trackActivity: TrackActivity;

      if (selectedTrackActivity.related_track_activity_ids) {
        trackActivityIds = trackActivityIds.concat(selectedTrackActivity.related_track_activity_ids);
      }

      trackActivityIds.forEach((trackActivityId: number) => {
        trackActivity = newState.entities[trackActivityId];

        if (trackActivity) {
          trackActivity.race_participants_track_activities =
            timingHelper.filterRaceParticipantTrackActivities(trackActivity, action.payload);
        }
      });

      return newState;
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedTrackActivityId;
export const getTrackActivitiesArray = (state: State) => lodash.map(state.ids, (id: any) => state.entities[id]);
