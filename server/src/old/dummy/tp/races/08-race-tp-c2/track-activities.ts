// models
import {
  TrackActivity
} from './../../../../model/track-activity.model';

// dummy data
import { F08_TP_C2_FRIDAY_TRACK_ACTIVITIES } from './friday/track-activities';
import { F08_TP_C2_SUNDAY_TRACK_ACTIVITIES } from './sunday/track-activities';
import { F08_TP_C2_SATURDAY_TRACK_ACTIVITIES } from './saturday/track-activities';

export const F08_TP_C2_TRACK_ACTIVITIES: TrackActivity[] = [
  ...F08_TP_C2_FRIDAY_TRACK_ACTIVITIES,
  ...F08_TP_C2_SATURDAY_TRACK_ACTIVITIES,
  ...F08_TP_C2_SUNDAY_TRACK_ACTIVITIES
];