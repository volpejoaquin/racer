// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../../model/track-activity.model';

// dummy data
import { TP_C1_CAR_DIVISION } from './../../../car-divisions';
import { F08_TP_C1_CIRCUIT_VARIANT } from './../circuit-variants';
import {
  F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_B,
  F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_A
} from './../race-participants-groups';

export const F08_TP_C1_SATURDAY_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '111',
    name: 'Entrenamiento grupo "A"',
    short_name: 'E "A"',
    date: '2018-10-13T08:20:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['112', '113'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '112',
    name: 'Entrenamiento grupo "B"',
    short_name: 'E "B"',
    date: '2018-10-13T08:45:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['111', '113'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '113',
    name: 'Entrenamiento',
    short_name: 'E',
    date: '2018-10-13T09:05:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['111', '112']
  },
  {
    id: '114',
    name: 'Clasificacion grupo "A"',
    short_name: 'C "A"',
    date: '2018-10-13T11:05:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['115', '120'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '115',
    name: 'Clasificacion grupo "B"',
    short_name: 'C "B"',
    date: '2018-10-13T11:20:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['114', '120'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '120',
    name: 'Clasificacion general',
    short_name: 'C GEN',
    date: '2018-10-13T11:30:00.000-03:00',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['114', '115']
  },
  {
    id: '122',
    name: '1º Final',
    short_name: 'FINAL1',
    date: '2018-10-13T14:20:00.000-03:00',
    duration: 30,
    laps: 16,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT
  }
];