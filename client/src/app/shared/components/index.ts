import { PartialLapTimeComponent } from './partial-lap-time/partial-lap-time.component';
import { LapTimeComponent } from './lap-time/lap-time.component';
import { TrackActivitiesComponent } from './track-activities/track-activities.component';
import { RaceWeekendComponent } from './race-weekend/race-weekend.component';

export const SHARED_COMPONENTS: any[] = [
  PartialLapTimeComponent,
  LapTimeComponent,
  TrackActivitiesComponent,
  RaceWeekendComponent
];

export * from './partial-lap-time/partial-lap-time.component';
export * from './lap-time/lap-time.component';
export * from './track-activities/track-activities.component';
export * from './race-weekend/race-weekend.component';
