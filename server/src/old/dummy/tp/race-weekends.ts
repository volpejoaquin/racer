// models
import { IRaceWeekend } from './../../../interfaces/race-weekend';

// dummy data
import { F07_TP_C3_TRACK_ACTIVITIES } from './races/07-race/track-activities';
import { F08_TP_C3_TRACK_ACTIVITIES } from './races/08-race/track-activities';

export const RACE_WEEKENDS_SAMPLE: IRaceWeekend[] = [
  {
    id: '1',
    name: 'Fecha Nº 7',
    start_date: '2018-09-17T03:00:00.000Z',
    end_date: '2018-09-19T16:00:00.000Z',
    track_activities: F07_TP_C3_TRACK_ACTIVITIES
  },
  {
    id: '2',
    name: 'Fecha Nº 8',
    start_date: '2018-10-12T03:00:00.000Z',
    end_date: '2018-10-14T16:00:00.000Z',
    track_activities: F08_TP_C3_TRACK_ACTIVITIES
  }
];
