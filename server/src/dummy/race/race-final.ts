// models
import {
  RaceParticipantTrackActivity,
} from './../../model/track-activity.model';

// data
import { RACE_SERIE_1_DATA, RACE_SERIE_2_DATA } from './race-serie';

export const RACE_FINAL_DATA: RaceParticipantTrackActivity[] = RACE_SERIE_1_DATA.concat(RACE_SERIE_2_DATA);

