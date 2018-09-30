import { LapTimePipe } from './lap-time.pipe';
import { PartialLapTimePipe } from './partial-lap-time.pipe';
import { OrderPipe } from './order.pipe';

export const SHARED_PIPES: any[] = [
  LapTimePipe,
  PartialLapTimePipe,
  OrderPipe
];

export * from './lap-time.pipe';
export * from './partial-lap-time.pipe';
export * from './order.pipe';
