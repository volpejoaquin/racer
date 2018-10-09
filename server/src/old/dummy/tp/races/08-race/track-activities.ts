// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../model/track-activity.model';

// dummy data
import { TP_C3_CAR_DIVISION } from './../../car-divisions';
import { F08_CIRCUIT_VARIANT } from './circuit-variants';
import {
  TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_NUMBERS
} from './../../../tp/race-participants-c3';

export const F08_TP_C3_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '1',
    name: 'Comunitarias 1 grupo "B"',
    short_name: 'COM "B"',
    date: '2018-10-12T00:10:50.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '2',
    name: 'Comunitarias 1 grupo "A"',
    short_name: 'COM "A"',
    date: '2018-10-12T00:11:15.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '3',
    name: 'Comunitarias 2 grupo "B"',
    short_name: 'COM "B"',
    date: '2018-10-12T00:13:35.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '4',
    name: 'Comunitarias 2 grupo "A',
    short_name: 'COM "A"',
    date: '2018-10-12T00:14:00.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '5',
    name: 'Comunitarias 3 grupo "B"',
    short_name: 'COM "B"',
    date: '2018-10-12T00:16:25.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '6',
    name: 'Comunitarias 3 grupo "A',
    short_name: 'COM "A"',
    date: '2018-10-12T00:16:50.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '7',
    name: 'Entrenamiento 1 grupo "B"',
    short_name: 'E1 "B"',
    date: '2018-10-13T00:09:15.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '8',
    name: 'Entrenamiento 1 grupo "A"',
    short_name: 'E1 "A"',
    date: '2018-10-13T00:09:40.000Z',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '9',
    name: 'Clasificacion 1 grupo "B"',
    short_name: 'C1 "B"',
    date: '2018-10-13T00:11:50.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '10',
    name: 'Clasificacion 1 grupo "A"',
    short_name: 'C1 "A"',
    date: '2018-10-13T00:11:55.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '11',
    name: 'Clasificacion 2 grupo "B"',
    short_name: 'C2 "B"',
    date: '2018-10-13T00:13:10.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '12',
    name: 'Clasificacion 2 grupo "A"',
    short_name: 'C2 "A"',
    date: '2018-10-13T00:13:25.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '13',
    name: '1º Serie',
    short_name: 'SERIE1',
    date: '2018-10-13T00:18:20.000Z',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '14',
    name: '2º Serie',
    short_name: 'SERIE2',
    date: '2018-10-13T00:18:50.000Z',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  },
  {
    id: '15',
    name: 'Final',
    short_name: 'FINAL',
    date: '2018-10-14T00:14:35.000Z',
    duration: 30,
    laps: 15,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_CIRCUIT_VARIANT
  }
];