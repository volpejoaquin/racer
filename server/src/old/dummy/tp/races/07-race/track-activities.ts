// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../model/track-activity.model';

// dummy data
import { TP_C3_CAR_DIVISION } from './../../car-divisions';
import { F07_CIRCUIT_VARIANT } from './circuit-variants';
import { F07_QUALY_A_SAMPLE, F07_QUALY_B_SAMPLE } from './qualy';
import { F07_RACE_SERIE_1, F07_RACE_SERIE_2 } from './race-serie';
import { F07_RACE_FINAL } from './race-final';
import {
  TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_NUMBERS
} from './../../../tp/race-participants-c3';

export const F07_TP_C3_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: 1,
    name: 'Clasificacion 1 grupo "B"',
    short_name: 'CLAS1 "B"',
    date: '2018-10-13T00:11:50.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: F07_QUALY_A_SAMPLE,
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS,
    related_track_activity_ids: [2, 3, 7]
  },
  {
    id: 2,
    name: 'Clasificacion 1 grupo "A"',
    short_name: 'CLAS1 "A"',
    date: '2018-10-13T00:11:55.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: F07_QUALY_B_SAMPLE,
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS,
    related_track_activity_ids: [1, 3, 7]
  },
  {
    id: 3,
    name: 'Clasificacion 1 general',
    short_name: 'CLAS1 GENERAL',
    date: null,
    duration: null,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: F07_QUALY_A_SAMPLE.concat(F07_QUALY_B_SAMPLE),
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: [1, 2, 7]
  },
  {
    id: 4,
    name: 'Clasificacion 2 grupo "B"',
    short_name: 'CLAS2 "B"',
    date: '2018-10-13T00:13:10.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS,
    related_track_activity_ids: [5, 6, 7]
  },
  {
    id: 5,
    name: 'Clasificacion 2 grupo "A"',
    short_name: 'CLAS2 "A"',
    date: '2018-10-13T00:13:25.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS,
    related_track_activity_ids: [4, 6, 7]
  },
  {
    id: 6,
    name: 'Clasificacion 2 general',
    short_name: 'CLAS2 GENERAL',
    date: null,
    duration: null,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: [4, 5, 7]
  },
  {
    id: 7,
    name: 'Clasificacion general',
    short_name: 'CLAS GENERAL',
    date: null,
    duration: null,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: F07_QUALY_A_SAMPLE.concat(F07_QUALY_B_SAMPLE),
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS
  },
  {
    id: 8,
    name: '1º Serie',
    short_name: 'SERIE1',
    date: '2018-10-13T00:18:20.000Z',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: F07_RACE_SERIE_1,
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT
  },
  {
    id: 9,
    name: '2º Serie',
    short_name: 'SERIE2',
    date: '2018-10-13T00:18:50.000Z',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: F07_RACE_SERIE_2,
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT
  },
  {
    id: 10,
    name: 'Final',
    short_name: 'FINAL',
    date: '2018-10-14T00:14:35.000Z',
    duration: 30,
    laps: 15,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: F07_RACE_FINAL,
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT
  }
];
