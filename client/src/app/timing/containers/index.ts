import { TimingHomeComponent } from './timing-home/timing-home.component';
import { TimingPrimaryBarComponent } from './timing-home/primary-bar/timing-primary-bar.component';
import { TimingSecondaryBarComponent } from './timing-home/secondary-bar/timing-secondary-bar.component';
import { TimingUiBarComponent } from './timing-home/ui-bar/timing-ui-bar.component';
import { TimingSecondaryBarExtraComponent } from './timing-home/secondary-bar/secondary-bar-extra/timing-secondary-bar-extra.component';
import { TimingAnalysisComponent } from './timing-analysis/timing-analysis.component';

export const TIMING_CONTAINER_COMPONENTS: any[] = [
  TimingHomeComponent,
  TimingPrimaryBarComponent,
  TimingSecondaryBarComponent,
  TimingUiBarComponent,
  TimingSecondaryBarExtraComponent,
  TimingAnalysisComponent
];

export * from './timing-home/timing-home.component';
export * from './timing-home/primary-bar/timing-primary-bar.component';
export * from './timing-home/secondary-bar/timing-secondary-bar.component';
export * from './timing-home/ui-bar/timing-ui-bar.component';
export * from './timing-home/secondary-bar/secondary-bar-extra/timing-secondary-bar-extra.component';
export * from './timing-analysis/timing-analysis.component';