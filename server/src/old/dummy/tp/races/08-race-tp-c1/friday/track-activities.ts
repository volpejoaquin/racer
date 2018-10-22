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
  F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_A,
  F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_B
} from './../race-participants-groups';

export const F08_TP_C1_FRIDAY_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '104',
    name: 'Comunitarias 2 grupo "A"',
    short_name: 'COM2 "A"',
    date: '2018-10-12T11:45:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['105', '106', '110'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '105',
    name: 'Comunitarias 2 grupo "B"',
    short_name: 'COM2 "B"',
    date: '2018-10-12T12:10:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['104', '106', '110'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '106',
    name: 'Comunitarias 2',
    short_name: 'COM2',
    date: '2018-10-12T12:30:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['104', '105', '110']
  },
  {
    id: '107',
    name: 'Comunitarias 3 grupo "A"',
    short_name: 'COM3 "A"',
    date: '2018-10-12T14:30:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['108', '109', '110'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '108',
    name: 'Comunitarias 3 grupo "B"',
    short_name: 'COM3 "B"',
    date: '2018-10-12T15:55:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['107', '109', '110'],
    enabled_race_participant_numbers: F08_TP_C1_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '109',
    name: 'Comunitarias 3',
    short_name: 'COM3',
    date: '2018-10-12T15:25:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['107', '108', '110']
  },
  {
    id: '110',
    name: 'Comunitarias General',
    short_name: 'COM GEN',
    date: '2018-10-12T15:25:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C1_CAR_DIVISION,
    circuit_variant: F08_TP_C1_CIRCUIT_VARIANT,
    related_track_activity_ids: ['103', '106', '109']
  }
];