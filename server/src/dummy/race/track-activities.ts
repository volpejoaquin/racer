// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../model/track-activity.model';

// dummy data
import { TP_C3_CAR_DIVISION } from './car-divisions';
import { CIRCUIT_VARIANT_SAMPLE } from './circuit-variants';
import { QUALY_A_SAMPLE, QUALY_B_SAMPLE } from './qualy';
import { RACE_SERIE_1_DATA, RACE_SERIE_2_DATA } from './race-serie';
import { RACE_FINAL_DATA } from './race-final';
import {
  TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS,
  TP_C3_RACE_PARTICIPANTS_NUMBERS
} from './../tp/race-participants-c3';

export const TP_C3_TRACK_ACTIVITY: TrackActivity = {
  id: 1,
  name: 'Clasificacion 1 grupo "B"',
  short_name: 'CLAS1 "B"',
  date: '2018-10-13T00:11:50.000Z',
  duration: 10,
  laps: 0,
  state: TrackActivityState.waiting,
  type: TrackActivityType.practice,
  // race_participants_track_activities: QUALY_A_SAMPLE,
  race_participants_track_activities: [],
  car_division: TP_C3_CAR_DIVISION,
  circuit_variant: CIRCUIT_VARIANT_SAMPLE,
  enabled_race_participant_numbers: TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS,
  related_track_activity_ids: [2, 3, 7]
};

export const TP_C3_TRACK_ACTIVITIES: TrackActivity[] = [
  TP_C3_TRACK_ACTIVITY,
  {
    id: 2,
    name: 'Clasificacion 1 grupo "A"',
    short_name: 'CLAS1 "A"',
    date: '2018-10-13T00:11:55.000Z',
    duration: 10,
    laps: 0,
    state: TrackActivityState.waiting,
    type: TrackActivityType.practice,
    // race_participants_track_activities: QUALY_B_SAMPLE,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: CIRCUIT_VARIANT_SAMPLE,
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
    // race_participants_track_activities: QUALY_A_SAMPLE.concat(QUALY_B_SAMPLE),
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: CIRCUIT_VARIANT_SAMPLE,
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
    circuit_variant: CIRCUIT_VARIANT_SAMPLE,
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
    circuit_variant: CIRCUIT_VARIANT_SAMPLE,
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
    circuit_variant: CIRCUIT_VARIANT_SAMPLE,
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
    // race_participants_track_activities: QUALY_A_SAMPLE.concat(QUALY_B_SAMPLE),
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: CIRCUIT_VARIANT_SAMPLE,
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
    // race_participants_track_activities: RACE_SERIE_1_DATA,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: CIRCUIT_VARIANT_SAMPLE
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
    // race_participants_track_activities: RACE_SERIE_2_DATA,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: CIRCUIT_VARIANT_SAMPLE
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
    // race_participants_track_activities: RACE_FINAL_DATA,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: CIRCUIT_VARIANT_SAMPLE
  }
];
