import { LapTimePipe } from './lap-time.pipe';
import { PartialLapTimePipe } from './partial-lap-time.pipe';

export const SHARED_PIPES: any[] = [
  LapTimePipe,
  PartialLapTimePipe
];

export * from './lap-time.pipe';
export * from './partial-lap-time.pipe';
