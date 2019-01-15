// angular
import { Component, Input, OnChanges } from '@angular/core';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-track-activity-analysis',
  templateUrl: './track-activity-analysis.component.html'
})
export class TrackActivityAnalysisComponent {
  @Input() theme = 'blue';
  @Input() hasContainerRightBorder = false;
}
