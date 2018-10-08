import { BaseModel } from './base.model';
import { City } from './index';

export interface Circuit extends BaseModel {
  // Simple
  name: string;
  // Relationships
  city: City;
}

export interface CircuitVariant extends BaseModel {
  // Simple
  name: string;
  length: number;
  // Relationships
  circuit: Circuit;
}
