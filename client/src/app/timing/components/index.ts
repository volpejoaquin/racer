import { TimingHomeComponent } from './timing-home/timing-home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PartialLapTimeComponent } from './partial-lap-time/partial-lap-time.component';
import { TrackActivityStateComponent } from './track-activity-state/track-activity-state.component';
import { PartialPerLapComponent } from './partials-per-lap/partials-per-lap.component';
import { LapTimeComponent } from './lap-time/lap-time.component';
import { BestPartialsLapsComponent } from './best-partials-laps/best-partials-laps.component';
import { BestPerPartialsComponent } from './best-per-partials/best-per-partials.component';

export const TIMING_COMPONENTS: any[] = [
  TimingHomeComponent,
  LeaderboardComponent,
  PartialLapTimeComponent,
  TrackActivityStateComponent,
  PartialPerLapComponent,
  LapTimeComponent,
  BestPartialsLapsComponent,
  BestPerPartialsComponent
];

export * from './leaderboard/leaderboard.component';
export * from './partial-lap-time/partial-lap-time.component';
export * from './track-activity-state/track-activity-state.component';
export * from './timing-home/timing-home.component';
export * from './partials-per-lap/partials-per-lap.component';
export * from './lap-time/lap-time.component';
export * from './best-partials-laps/best-partials-laps.component';
export * from './best-per-partials/best-per-partials.component';
