// models
import {
  TrackActivity,
  TrackActivityState
} from './../../model/track-activity.model';
import { RACE_FINAL_DATA } from './race-final';

export const TRACK_ACTIVITY_SAMPLE: TrackActivity = {
  name: 'Comunitarias 1 grupo "B"',
  short_name: 'COM "B"',
  date: '2018-10-12T00:10:50.000Z',
  duration: 20,
  laps: 0,
  state: TrackActivityState.waiting,
  race_participants_track_activities: RACE_FINAL_DATA,
  best_lap: RACE_FINAL_DATA[0].best_lap
};

export const TRACK_ACTIVITIES_SAMPLE: TrackActivity[] = [
  TRACK_ACTIVITY_SAMPLE,
  {
    name: 'Comunitarias 1 grupo "A"',
    short_name: 'COM "A"',
    date: '2018-10-12T00:11:15.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Comunitarias 2 grupo "B"',
    short_name: 'COM "B"',
    date: '2018-10-12T00:13:35.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Comunitarias 2 grupo "A',
    short_name: 'COM "A"',
    date: '2018-10-12T00:14:00.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Comunitarias 3 grupo "B"',
    short_name: 'COM "B"',
    date: '2018-10-12T00:16:25.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Comunitarias 3 grupo "A',
    short_name: 'COM "A"',
    date: '2018-10-12T00:16:50.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Entrenamiento 1 grupo "B"',
    short_name: 'E1 "B"',
    date: '2018-10-13T00:09:15.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Entrenamiento 1 grupo "A"',
    short_name: 'E1 "A"',
    date: '2018-10-13T00:09:40.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Clasificacion 1 grupo "B"',
    short_name: 'C1 "B"',
    date: '2018-10-13T00:11:50.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Clasificacion 1 grupo "A"',
    short_name: 'C1 "A"',
    date: '2018-10-13T00:11:55.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Clasificacion 2 grupo "B"',
    short_name: 'C2 "B"',
    date: '2018-10-13T00:13:10.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Clasificacion 2 grupo "A"',
    short_name: 'C2 "A"',
    date: '2018-10-13T00:13:25.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: '1º Serie',
    short_name: 'SERIE1',
    date: '2018-10-13T00:18:20.000Z',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: '2º Serie',
    short_name: 'SERIE2',
    date: '2018-10-13T00:18:50.000Z',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  },
  {
    name: 'Final',
    short_name: 'FINAL',
    date: '2018-10-14T00:14:35.000Z',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    race_participants_track_activities: []
  }
];
