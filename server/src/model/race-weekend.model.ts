import { BaseModel } from './base.model';
import {
  Championship,
  CircuitVariant,
  TrackActivity
} from './index';

export interface RaceWeekend extends BaseModel {
  name: string;
  // Relationships
  championship: Championship;
  circuit_variant: CircuitVariant;
  // Optionals
  // Relationships
  track_activities: TrackActivity[];
}
