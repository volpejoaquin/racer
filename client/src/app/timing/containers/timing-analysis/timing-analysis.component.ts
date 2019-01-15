// angular
import { Component } from '@angular/core';

// components
import { RaceParticipantTrackActivity } from '../../../shared/model';

@Component({
  selector: 'racer-timing-analysis',
  templateUrl: './timing-analysis.component.html'
})
export class TimingAnalysisComponent {
  raceParticipantTrackActivity1: RaceParticipantTrackActivity;
  raceParticipantTrackActivity2: RaceParticipantTrackActivity;
  raceParticipantTrackActivityRef: RaceParticipantTrackActivity;
}
