import { BaseModel } from './base.model';
import {
  RaceParticipant,
  CarDivision,
  CircuitVariant
} from './index';

export enum TrackActivityState {
  waiting = 'waiting',
  started = 'started',
  caution = 'caution',
  stopped = 'stopped',
  finished = 'finished'
}

export enum TrackActivityType {
  practice = 'practice',
  race = 'race'
}

export interface TrackActivity extends BaseModel {
  // Simple
  name: string;
  short_name: string;
  date: string;
  duration: number; // In minutes
  laps: number;
  state: TrackActivityState;
  type: TrackActivityType;
  // Optionals
  // Relationships
  car_division?: CarDivision;
  circuit_variant?: CircuitVariant;
  race_participants_track_activities?: RaceParticipantTrackActivity[];
  enabled_race_participant_numbers?: number[];
  related_track_activity_ids?: string[];
}

export interface TrackPartialLap extends BaseModel {
  // Simple
  time: number;
  sector: number;
}

export enum RaceParticipantTrackActivityState {
  on_track = 'on_track',
  on_pit = 'on_pit',
}

export interface RaceParticipantTrackActivity extends BaseModel {
  // Relationships
  state: RaceParticipantTrackActivityState,
  race_participant: RaceParticipant;
  laps: TrackLap[];
  best_lap: TrackLap;
  best_lap_index: number;
  last_lap: TrackLap;
  laps_count: number;
  total_time: number;
}

export interface TrackLap extends BaseModel {
  // Simple
  ref_lap: boolean;
  partial_lap: boolean;
  // Relationships
  partials: TrackPartialLap[];
  // Optionals
  time?: number;
}
