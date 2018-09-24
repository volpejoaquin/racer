import { BaseModel } from './base.model';

export interface CarCategory extends BaseModel {
  // Simple
  name: string;
  short_name: string;
}

export interface CarDivision extends BaseModel {
  // Simple
  name: string;
  short_name: string;
  car_category: CarCategory;
}
