import { LapTimePipe } from './lap-time.pipe';
import { PartialLapTimePipe } from './partial-lap-time.pipe';
import { OrderPipe } from './order.pipe';
import { OrderByTrackActivityPipe } from './order-by-track-activity.pipe';
import { FilterPipe } from './filter.pipe';

export const SHARED_PIPES: any[] = [
  LapTimePipe,
  PartialLapTimePipe,
  OrderPipe,
  OrderByTrackActivityPipe,
  FilterPipe
];

export * from './lap-time.pipe';
export * from './partial-lap-time.pipe';
export * from './order.pipe';
export * from './order-by-track-activity.pipe';
export * from './filter.pipe';
