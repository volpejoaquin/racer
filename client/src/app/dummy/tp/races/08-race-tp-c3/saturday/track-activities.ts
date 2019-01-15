// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../../shared/model/track-activity.model';

// dummy data
import { TP_C3_CAR_DIVISION } from './../../../car-divisions';
import { F08_TP_C3_CIRCUIT_VARIANT } from './../circuit-variants';
import {
  F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_A,
  F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_B
} from './../race-participants-groups';

export const F08_TP_C3_SATURDAY_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '311',
    name: 'Entrenamiento grupo "B"',
    short_name: 'E "B"',
    date: '2018-10-13T09:15:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['312', '313'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '312',
    name: 'Entrenamiento grupo "A"',
    short_name: 'E "A"',
    date: '2018-10-13T09:40:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['311', '313'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '313',
    name: 'Entrenamiento',
    short_name: 'E',
    date: '2018-10-13T09:40:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['311', '312']
  },
  {
    id: '314',
    name: 'Clasificacion 1 grupo "B"',
    short_name: 'C1 "B"',
    date: '2018-10-13T11:40:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['315', '316', '320'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '315',
    name: 'Clasificacion 1 grupo "A"',
    short_name: 'C1 "A"',
    date: '2018-10-13T11:55:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['314', '316', '320'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '316',
    name: 'Clasificacion 1',
    short_name: 'C1',
    date: '2018-10-13T11:55:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['314', '315', '320']
  },
  {
    id: '317',
    name: 'Clasificacion 2 grupo "B"',
    short_name: 'C2 "B"',
    date: '2018-10-13T13:10:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['318', '319', '320'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '318',
    name: 'Clasificacion 2 grupo "A"',
    short_name: 'C2 "A"',
    date: '2018-10-13T13:25:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['317', '319', '320'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '319',
    name: 'Clasificacion 2',
    short_name: 'C2',
    date: '2018-10-13T13:25:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['317', '318', '320']
  },
  {
    id: '320',
    name: 'Clasificacion general',
    short_name: 'C GEN',
    date: '2018-10-13T13:25:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['317', '318']
  },
  {
    id: '321',
    name: '1º Serie',
    short_name: 'SERIE1',
    date: '2018-10-13T15:20:00.000-03:00',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT
  },
  {
    id: '322',
    name: '2º Serie',
    short_name: 'SERIE2',
    date: '2018-10-13T15:50:00.000-03:00',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT
  }
];