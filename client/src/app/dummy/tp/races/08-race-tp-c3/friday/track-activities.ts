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

export const F08_TP_C3_FRIDAY_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '301',
    name: 'Comunitarias 1 grupo "B"',
    short_name: 'COM1 "B"',
    date: '2018-10-12T10:50:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['302', '303', '310'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '302',
    name: 'Comunitarias 1 grupo "A"',
    short_name: 'COM1 "A"',
    date: '2018-10-12T11:15:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['301', '303', '310'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '303',
    name: 'Comunitarias 1',
    short_name: 'COM1',
    date: '2018-10-12T11:15:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['301', '302', '310']
  },
  {
    id: '304',
    name: 'Comunitarias 2 grupo "B"',
    short_name: 'COM2 "B"',
    date: '2018-10-12T13:35:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['305', '306', '310'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '305',
    name: 'Comunitarias 2 grupo "A"',
    short_name: 'COM2 "A"',
    date: '2018-10-12T14:00:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['304', '306', '310'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '306',
    name: 'Comunitarias 2',
    short_name: 'COM2',
    date: '2018-10-12T14:00:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['304', '305', '310']
  },
  {
    id: '307',
    name: 'Comunitarias 3 grupo "B"',
    short_name: 'COM3 "B"',
    date: '2018-10-12T16:25:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['308', '309', '310'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '308',
    name: 'Comunitarias 3 grupo "A"',
    short_name: 'COM3 "A"',
    date: '2018-10-12T16:50:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['307', '309', '310'],
    enabled_race_participant_numbers: F08_TP_C3_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '309',
    name: 'Comunitarias 3',
    short_name: 'COM3',
    date: '2018-10-12T16:50:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['307', '308', '310']
  },
  {
    id: '310',
    name: 'Comunitarias General',
    short_name: 'COM GEN',
    date: '2018-10-12T17:10:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT,
    related_track_activity_ids: ['303', '306', '309']
  }
];