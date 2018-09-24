import { BaseModel } from './base.model';

export interface City extends BaseModel {
  // Simple
  name: string;
  country?: string;
}
