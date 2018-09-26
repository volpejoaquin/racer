import { BaseModel } from './base.model';
import {
  TrackActivity
} from './index';

export interface RaceWeekend extends BaseModel {
  name: string;
  start_date: string;
  end_date: string;
  // Relationships
  track_activities: TrackActivity[];
}
