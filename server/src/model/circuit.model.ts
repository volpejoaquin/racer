import { City } from './index';

export interface Circuit {
  // Simple
  name: string;
  // Relationships
  city: City;
}

export interface CircuitVariant {
  // Simple
  name: string;
  length: number;
  // Relationships
  circuit: Circuit;
}
