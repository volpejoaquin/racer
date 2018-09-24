// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// models
import { TrackActivity } from '../../shared/model';

// actions
import {
  TrackActivityActions
} from './../actions/';

// dummy data
import { TRACK_ACTIVITIES_SAMPLE } from '../../shared/dummy';

export interface State extends EntityState<TrackActivity> {
  selectedTrackActivityId: number | null;
}

export const adapter: EntityAdapter<TrackActivity> = createEntityAdapter<TrackActivity>({
  selectId: (trackActivity: TrackActivity) => trackActivity.id,
  sortComparer: false,
});

export let initialState: State = adapter.getInitialState({
  selectedTrackActivityId: 1,
});

initialState = adapter.addAll(TRACK_ACTIVITIES_SAMPLE, initialState); // TODO: REVIEW THIS

export function reducer(
  state = initialState,
  action:
    | TrackActivityActions.SelectTrackActivity
): State {
  switch (action.type) {
    case TrackActivityActions.TrackActivityActionTypes.SelectTrackActivity: {
      return {
        ...state,
        selectedTrackActivityId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedTrackActivityId;
