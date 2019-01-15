// models
import { RaceWeekend } from './../../shared/model';

// dummy data
import {
  F07_TP_C3_TRACK_ACTIVITIES,
  F08_TP_C1_TRACK_ACTIVITIES,
  F08_TP_C2_TRACK_ACTIVITIES,
  F08_TP_C3_TRACK_ACTIVITIES
} from './races/';

export const RACE_WEEKENDS_SAMPLE: RaceWeekend[] = [
  {
    id: '1',
    name: 'Fecha Nº 8 - C3',
    start_date: '2018-10-12T03:00:00.000Z',
    end_date: '2018-10-14T16:00:00.000Z',
    track_activities: F08_TP_C3_TRACK_ACTIVITIES
  },
  {
    id: '2',
    name: 'Fecha Nº 8 - C2',
    start_date: '2018-10-12T03:00:00.000Z',
    end_date: '2018-10-14T16:00:00.000Z',
    track_activities: F08_TP_C2_TRACK_ACTIVITIES
  },
  {
    id: '3',
    name: 'Fecha Nº 8 - C1',
    start_date: '2018-10-12T03:00:00.000Z',
    end_date: '2018-10-14T16:00:00.000Z',
    track_activities: F08_TP_C1_TRACK_ACTIVITIES
  },
  {
    id: '4',
    name: 'Fecha Nº 7 - C3',
    start_date: '2018-09-17T03:00:00.000Z',
    end_date: '2018-09-19T16:00:00.000Z',
    track_activities: F07_TP_C3_TRACK_ACTIVITIES
  }
];
