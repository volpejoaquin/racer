// models
import {
  RaceWeekend
} from './../../model/';

// dummy data
import { TP_C3_TRACK_ACTIVITIES } from './track-activities';

export const RACE_WEEKEND_SAMPLE: RaceWeekend = {
  id: 1,
  name: 'Fecha Nº 8',
  start_date: '2018-10-12T03:00:00.000Z',
  end_date: '2018-10-14T16:00:00.000Z',
  track_activities: TP_C3_TRACK_ACTIVITIES
};

export const RACE_WEEKENDS_SAMPLE: RaceWeekend[] = [
  RACE_WEEKEND_SAMPLE
];
