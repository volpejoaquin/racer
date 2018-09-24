// models
import {
  RaceWeekend
} from './../../model/';

// dummy data
import { TRACK_ACTIVITIES_SAMPLE } from './track-activities';
import { CIRCUIT_VARIANT_SAMPLE } from './circuit-variants';
import { CHAMPIONSHIP_SAMPLE } from './championships';

export const RACE_WEEKEND_SAMPLE: RaceWeekend = {
  id: 1,
  name: 'Fecha Nº 8',
  championship: CHAMPIONSHIP_SAMPLE,
  circuit_variant: CIRCUIT_VARIANT_SAMPLE,
  track_activities: TRACK_ACTIVITIES_SAMPLE
};

export const RACE_WEEKENDS_SAMPLE: RaceWeekend[] = [
  RACE_WEEKEND_SAMPLE
];
