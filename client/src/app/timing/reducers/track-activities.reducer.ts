// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

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
  selectedTrackActivityId: 1,
});

initialState = adapter.addAll(TP_C3_TRACK_ACTIVITIES, initialState); // TODO: REVIEW THIS

export function reducer(
  state = initialState,
  action:
    | TrackActivityActions.SelectTrackActivity
    | RaceParticipantTrackActivityActions.LoadRaceParticipantTrackActivities
): State {
  switch (action.type) {
    case TrackActivityActions.TrackActivityActionTypes.SelectTrackActivity: {
      return {
        ...state,
        selectedTrackActivityId: action.payload
      };
    }

    case RaceParticipantTrackActivityActions.RaceParticipantTrackActivityActionTypes.LoadRaceParticipantTrackActivities: {

      const selectedTrackActivityId = state.selectedTrackActivityId,
        selectedTrackActivity = state.entities[selectedTrackActivityId];

      let raceParticipantTrackActivities: RaceParticipantTrackActivity[] = [];

      if (selectedTrackActivity.enabled_race_participant_numbers) {
        let raceParticipantNumber: number;

        action.payload.forEach((raceParticipantTrackActivity: RaceParticipantTrackActivity) => {
          raceParticipantNumber = raceParticipantTrackActivity.race_participant ? raceParticipantTrackActivity.race_participant.number : 0;

          if (selectedTrackActivity.enabled_race_participant_numbers.indexOf(raceParticipantNumber) >= 0) {
            raceParticipantTrackActivities.push(raceParticipantTrackActivity);
          }
        });
      } else {
        raceParticipantTrackActivities = action.payload;
      }

      selectedTrackActivity.race_participants_track_activities = raceParticipantTrackActivities;

      return state;
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedTrackActivityId;
