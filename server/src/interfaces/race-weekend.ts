import { IBaseModel } from './base-model';

export interface IRaceWeekend extends IBaseModel {
  name?: string;
  start_date?: string;
  end_date?: string;
  track_activities?: any; // TODO: REVIEW THIS
}
