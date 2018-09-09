import { CarDivision } from './index';

export interface Championship {
  // Simple
  year: number;
  // Relationships
  car_division: CarDivision;
}
