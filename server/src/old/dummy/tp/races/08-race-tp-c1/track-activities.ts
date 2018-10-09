// models
import {
  TrackActivity
} from './../../../../model/track-activity.model';

// dummy data
import { F08_TP_C1_FRIDAY_TRACK_ACTIVITIES } from './friday/track-activities';
import { F08_TP_C1_SUNDAY_TRACK_ACTIVITIES } from './sunday/track-activities';
import { F08_TP_C1_SATURDAY_TRACK_ACTIVITIES } from './saturday/track-activities';

export const F08_TP_C1_TRACK_ACTIVITIES: TrackActivity[] = [
  ...F08_TP_C1_FRIDAY_TRACK_ACTIVITIES,
  ...F08_TP_C1_SATURDAY_TRACK_ACTIVITIES,
  ...F08_TP_C1_SUNDAY_TRACK_ACTIVITIES
];