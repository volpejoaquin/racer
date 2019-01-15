// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../../shared/model/track-activity.model';

// dummy data
import { TP_C2_CAR_DIVISION } from './../../../car-divisions';
import { F08_TP_C2_CIRCUIT_VARIANT } from './../circuit-variants';
import {
  F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_A,
  F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_B
} from './../race-participants-groups';

export const F08_TP_C2_FRIDAY_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '204',
    name: 'Comunitarias 2 grupo "B"',
    short_name: 'COM2 "B"',
    date: '2018-10-12T12:40:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['205', '206', '210'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '205',
    name: 'Comunitarias 2 grupo "A"',
    short_name: 'COM2 "A"',
    date: '2018-10-12T13:05:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['204', '206', '210'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '206',
    name: 'Comunitarias 2',
    short_name: 'COM2',
    date: '2018-10-12T13:25:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['204', '205', '210']
  },
  {
    id: '207',
    name: 'Comunitarias 3 grupo "B"',
    short_name: 'COM3 "B"',
    date: '2018-10-12T15:25:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['208', '209', '210'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_B
  },
  {
    id: '208',
    name: 'Comunitarias 3 grupo "A"',
    short_name: 'COM3 "A"',
    date: '2018-10-12T15:45:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['207', '209', '210'],
    enabled_race_participant_numbers: F08_TP_C2_RACE_PARTICIPANTS_NUMBER_GROUP_A
  },
  {
    id: '209',
    name: 'Comunitarias 3',
    short_name: 'COM3',
    date: '2018-10-12T16:05:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['207', '208', '210']
  },
  {
    id: '210',
    name: 'Comunitarias General',
    short_name: 'COM GEN',
    date: '2018-10-12T16:05:00.000-03:00',
    duration: 20,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    race_participants_track_activities: [],
    car_division: TP_C2_CAR_DIVISION,
    circuit_variant: F08_TP_C2_CIRCUIT_VARIANT,
    related_track_activity_ids: ['203', '206', '209']
  }
];