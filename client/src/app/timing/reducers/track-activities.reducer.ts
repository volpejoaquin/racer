// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as lodash from 'lodash';

// helpers
import { TimingHelper } from './../../shared/helpers/timing.helper';

// models
import {
  TrackActivity,
  RaceParticipantTrackActivity
} from '../../shared/model';

// actions
import {
  TrackActivityActions,
  RaceParticipantTrackActivityActions
} from './../actions/';

export interface State extends EntityState<TrackActivity> {
  selectedTrackActivityId: string | null;
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
    | TrackActivityActions.LoadTrackActivities
    | RaceParticipantTrackActivityActions.ImportRaceParticipantTrackActivities
): State {
  switch (action.type) {
    case TrackActivityActions.TrackActivityActionTypes.SelectTrackActivity: {
      return {
        ...state,
        selectedTrackActivityId: action.payload
      };
    }

    case TrackActivityActions.TrackActivityActionTypes.LoadTrackActivities: {

      const newState = adapter.addAll(action.payload, state);
      const list: TrackActivity[] = Object.values(newState.entities);
      const selectedTrackActivityId =  list && list.length > 0 ? list[0].id : null;

      return {
        ...newState,
        selectedTrackActivityId: selectedTrackActivityId
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

      let newRaceParticipantsTrackActivities: RaceParticipantTrackActivity[];
      trackActivityIds.forEach((trackActivityId: string) => {
        trackActivity = newState.entities[trackActivityId];

        if (trackActivity) {
          newRaceParticipantsTrackActivities = timingHelper.filterRaceParticipantTrackActivities(trackActivity, action.payload);
          trackActivity.race_participants_track_activities =
            trackActivity.race_participants_track_activities.concat(newRaceParticipantsTrackActivities);
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
