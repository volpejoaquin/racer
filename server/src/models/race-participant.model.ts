import { Championship } from './index';

export interface Team {
  // Simple
  name: string;
}

export interface Car {
  // Simple
  name: string;
}

export interface Driver {
  // Simple
  name: string;
  last_name: string;
}

export interface RaceParticipant {
  // Relationships
  team: Team;
  car: Car;
  driver: Driver;
  number: number;
  championship: Championship;
}
