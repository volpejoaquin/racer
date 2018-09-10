import {
  RaceWeekend,
  RaceParticipant
} from './index';

export interface TrackActivity {
  // Simple
  name: string;
  short_name: string;
  date: string;
  duration: number; // In seconds
  // Optionals
  // Relationships
  race_weekend?: RaceWeekend;
}

export interface TrackPartialLap {
  // Simple
  time: number;
  sector: number;
}

export enum RaceParticipantTrackActivityState {
  on_track = 'on_track',
  on_pit = 'on_pit',
}

export interface RaceParticipantTrackActivity {
  // Relationships
  state: RaceParticipantTrackActivityState,
  track_activity: TrackActivity;
  race_participant: RaceParticipant;
  laps: TrackLap[];
  laps_count: number;
  best_lap: TrackLap;
  last_lap: TrackLap;
}

export interface TrackLap {
  // Simple
  time: number;
  ref_lap: boolean;
  // Relationships
  partials: TrackPartialLap[];
}
