// models
import {
  TrackActivity,
  TrackActivityState,
  TrackActivityType
} from './../../../../../shared/model/track-activity.model';

// dummy data
import { TP_C3_CAR_DIVISION } from './../../../car-divisions';
import { F08_TP_C3_CIRCUIT_VARIANT } from './../circuit-variants';

export const F08_TP_C3_SUNDAY_TRACK_ACTIVITIES: TrackActivity[] = [
  {
    id: '323',
    name: 'Final',
    short_name: 'FINAL',
    date: '2018-10-14T11:35:00.000-03:00',
    duration: 30,
    laps: 17,
    state: TrackActivityState.waiting,
    type: TrackActivityType.race,
    race_participants_track_activities: [],
    car_division: TP_C3_CAR_DIVISION,
    circuit_variant: F08_TP_C3_CIRCUIT_VARIANT
  }
];