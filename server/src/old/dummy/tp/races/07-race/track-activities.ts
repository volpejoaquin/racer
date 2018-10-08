// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../model/track-activity.model';

// dummy data
import { TP_C3_CAR_DIVISION } from './../../car-divisions';
import { F07_CIRCUIT_VARIANT } from './circuit-variants';
import { F07_01_PRACTICE } from './practice/';
import { F07_RACE_SERIE_1, F07_RACE_SERIE_2 } from './race-serie';
import { F07_RACE_FINAL } from './race-final';
import {
  TP_C3_RACE_PARTICIPANTS_NUMBERS
} from './../../../tp/race-participants-c3';

export const F07_TP_C3_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: 1,
    name: 'Entrenamiento 1',
    short_name: 'ENTR 1',
    date: '2018-10-13T00:11:50.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: F07_01_PRACTICE,
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: []
  },
  {
    id: 2,
    name: 'Entrenamiento 2',
    short_name: 'ENTR 2',
    date: '2018-10-13T00:11:55.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: []
  },
  {
    id: 3,
    name: 'Entrenamiento general',
    short_name: 'ENTR GENERAL',
    date: null,
    duration: null,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: []
  },
  {
    id: 4,
    name: 'Clasificación 1',
    short_name: 'CLAS 1',
    date: '2018-10-13T00:13:10.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: []
  },
  {
    id: 5,
    name: 'Clasificación 2',
    short_name: 'CLAS 2',
    date: '2018-10-13T00:13:25.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: []
  },
  {
    id: 6,
    name: 'Clasificación general',
    short_name: 'CLAS GENERAL',
    date: null,
    duration: null,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F07_CIRCUIT_VARIANT,
    enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_NUMBERS,
    related_track_activity_ids: []
  },
  {
    id: 7,
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
    id: 8,
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
    id: 9,
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
