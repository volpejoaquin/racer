import { TimingHomeComponent } from './timing-home/timing-home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PartialLapTimeComponent } from './partial-lap-time/partial-lap-time.component';
import { TrackActivityStateComponent } from './track-activity-state/track-activity-state.component';

export const TIMING_COMPONENTS: any[] = [
  TimingHomeComponent,
  LeaderboardComponent,
  PartialLapTimeComponent,
  TrackActivityStateComponent
];

export * from './leaderboard/leaderboard.component';
export * from './partial-lap-time/partial-lap-time.component';
export * from './track-activity-state/track-activity-state.component';
export * from './timing-home/timing-home.component';
