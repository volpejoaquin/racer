import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TrackActivityStateComponent } from './track-activity-state/track-activity-state.component';
import { PartialsPerLapComponent } from './partials-per-lap/partials-per-lap.component';
import { BestPartialsLapsComponent } from './best-partials-laps/best-partials-laps.component';
import { BestPerPartialsComponent } from './best-per-partials/best-per-partials.component';
import { TrackActivityAnalysisComponent } from './track-activity-analysis/track-activity-analysis.component';

export const TIMING_COMPONENTS: any[] = [
  LeaderboardComponent,
  TrackActivityStateComponent,
  PartialsPerLapComponent,
  BestPartialsLapsComponent,
  BestPerPartialsComponent,
  TrackActivityAnalysisComponent
];

export * from './leaderboard/leaderboard.component';
export * from './track-activity-state/track-activity-state.component';
export * from './partials-per-lap/partials-per-lap.component';
export * from './best-partials-laps/best-partials-laps.component';
export * from './best-per-partials/best-per-partials.component';
export * from './track-activity-analysis/track-activity-analysis.component';
