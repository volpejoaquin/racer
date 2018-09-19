import {
  RaceParticipantTrackActivity,
  RaceParticipantTrackActivityState
} from './../../model/';

export const RACE_PARTICIPANT_TRACK_ACTIVITY_EMPTY_SAMPLE: RaceParticipantTrackActivity = {
  state: RaceParticipantTrackActivityState.on_pit,
  race_participant: null,
  laps: [],
  laps_count: 0,
  best_lap: null,
  last_lap: null
};
