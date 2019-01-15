// models
import {
  TrackActivity
} from './../../../../shared/model/track-activity.model';

// dummy data
import {
  TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_NUMBERS
} from './../../../tp/race-participants-c3';
import { F08_TP_C3_FRIDAY_TRACK_ACTIVITIES } from './friday/track-activities';
import { F08_TP_C3_SUNDAY_TRACK_ACTIVITIES } from './sunday/track-activities';
import { F08_TP_C3_SATURDAY_TRACK_ACTIVITIES } from './saturday/track-activities';

export const F08_TP_C3_TRACK_ACTIVITIES: TrackActivity[] = [
  ...F08_TP_C3_FRIDAY_TRACK_ACTIVITIES,
  ...F08_TP_C3_SATURDAY_TRACK_ACTIVITIES,
  ...F08_TP_C3_SUNDAY_TRACK_ACTIVITIES
];