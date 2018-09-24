// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// models
import { TrackActivity } from '../../shared/model';

// actions
import {
  TrackActivityActions
} from './../actions/';

// dummy data
import { RACE_WEEKEND } from '../../shared/dummy';

export interface State extends EntityState<TrackActivity> {
  selectedTrackActivityId: number | null;
}

export const adapter: EntityAdapter<TrackActivity> = createEntityAdapter<TrackActivity>({
  selectId: (trackActivity: TrackActivity) => trackActivity.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedTrackActivityId: null,
});

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
