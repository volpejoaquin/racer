// models
import { IRaceWeekend } from './../../../interfaces/race-weekend';

// dummy data
// import { TP_C3_TRACK_ACTIVITIES } from './track-activities';

export const RACE_WEEKEND_SAMPLE: IRaceWeekend = {
  id: '1',
  name: 'Fecha Nº 8',
  start_date: '2018-10-12T03:00:00.000Z',
  end_date: '2018-10-14T16:00:00.000Z'
};

export const RACE_WEEKENDS_SAMPLE: IRaceWeekend[] = [
  RACE_WEEKEND_SAMPLE
];
