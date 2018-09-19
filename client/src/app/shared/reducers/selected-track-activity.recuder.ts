// models
import { TrackActivity } from '../model';

// actions
import { Actions, SELECT_TRACK_ACTIVITY } from './../actions/track-activity.actions';

// dummy data
import { TRACK_ACTIVITY_SAMPLE } from '../dummy';

const initialState: TrackActivity = TRACK_ACTIVITY_SAMPLE;

export function selectedTrackActivityReducer(
  state: TrackActivity = initialState,
  action: Actions) {

  switch (action.type) {
    case SELECT_TRACK_ACTIVITY:
      return action.payload ? action.payload : state;

    default:
      return state;
  }
}
