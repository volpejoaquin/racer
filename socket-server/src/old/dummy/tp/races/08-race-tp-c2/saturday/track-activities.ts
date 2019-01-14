// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../../model/track-activity.model';

// dummy data
import { TP_C2_CAR_DIVISION } from './../../../car-divisions';
import { F08_TP_C2_CIRCUIT_VARIANT } from './../circuit-variants';
import {
  F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_A,
  F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_B
} from './../race-participants-groups';

export const F08_TP_C2_SATURDAY_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '211',
    name: 'Entrenamiento grupo "B"',
    short_name: 'E "B"',
    date: '2018-10-13T10:10:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['212', '213'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '212',
    name: 'Entrenamiento grupo "A"',
    short_name: 'E "A"',
    date: '2018-10-13T10:35:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['211', '213'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '213',
    name: 'Entrenamiento',
    short_name: 'E',
    date: '2018-10-13T10:55:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['211', '212']
  },
  {
    id: '214',
    name: 'Clasificacion 1 grupo "B"',
    short_name: 'C1 "B"',
    date: '2018-10-13T12:15:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['215', '216', '320'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '215',
    name: 'Clasificacion 1 grupo "A"',
    short_name: 'C1 "A"',
    date: '2018-10-13T12:30:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['214', '216', '320'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '216',
    name: 'Clasificacion 1',
    short_name: 'C1',
    date: '2018-10-13T12:40:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['214', '215', '320']
  },
  {
    id: '217',
    name: 'Clasificacion 2 grupo "B"',
    short_name: 'C2 "B"',
    date: '2018-10-13T13:45:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['218', '219', '320'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '218',
    name: 'Clasificacion 2 grupo "A"',
    short_name: 'C2 "A"',
    date: '2018-10-13T14:00:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['217', '219', '320'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '219',
    name: 'Clasificacion 2',
    short_name: 'C2',
    date: '2018-10-13T14:10:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['217', '218', '320']
  },
  {
    id: '320',
    name: 'Clasificacion general',
    short_name: 'C GEN',
    date: '2018-10-13T14:10:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['217', '218']
  },
  {
    id: '321',
    name: '1º Serie',
    short_name: 'SERIE1',
    date: '2018-10-13T16:20:00.000-03:00',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT
  },
  {
    id: '322',
    name: '2º Serie',
    short_name: 'SERIE2',
    date: '2018-10-13T16:50:00.000-03:00',
    duration: 0,
    laps: 6,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT
  }
];