// models
import {
  RaceWeekend,
  TrackActivity
} from './shared/model/';

export interface AppState {
  readonly selected_race_weekend: RaceWeekend;
  readonly selected_track_activity: TrackActivity;
}
