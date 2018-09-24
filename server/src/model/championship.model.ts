import { BaseModel } from './base.model';
import { CarDivision } from './index';

export interface Championship extends BaseModel {
  // Simple
  year: number;
  // Relationships
  car_division: CarDivision;
}
