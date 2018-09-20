import {
  RaceWeekend,
  RaceParticipant
} from './index';

export enum TrackActivityState {
  waiting = 'waiting',
  started = 'started',
  caution = 'caution',
  stopped = 'stopped',
  finished = 'finished'
}

export interface TrackActivity {
  // Simple
  name: string;
  short_name: string;
  date: string;
  duration: number; // In minutes
  laps: number;
  state: TrackActivityState;
  // Optionals
  // Relationships
  race_weekend?: RaceWeekend;
  race_participants_track_activities?: RaceParticipantTrackActivity[];
  best_lap?: TrackLap;
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
  partial_lap: boolean;
  // Relationships
  partials: TrackPartialLap[];
}
