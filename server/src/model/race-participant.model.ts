import { BaseModel } from './base.model';
import { Championship } from './index';

export interface Team extends BaseModel {
  // Simple
  name: string;
}

export interface Car extends BaseModel {
  // Simple
  name: string;
}

export interface Driver extends BaseModel {
  // Simple
  name: string;
  last_name: string;
}

export interface RaceParticipant extends BaseModel {
  // Relationships
  team: Team;
  car: Car;
  driver: Driver;
  number: number;
  championship: Championship;
}
