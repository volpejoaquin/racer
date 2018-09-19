// models
import {
  RaceWeekend,
  TrackActivity
} from './';

export interface AppState {
  selected_race_weekend: RaceWeekend;
  selected_track_activity: TrackActivity;
}
