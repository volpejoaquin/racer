// angular
import { Component, Input, OnChanges } from '@angular/core';

// libs
import * as lodash from 'lodash';

// models
import {
  TrackLap,
  TrackPartialLap
} from '../../../shared/model/';

// helpers
import { TimingHelper } from '../../helpers';

@Component({
  selector: 'racer-lap-time',
  templateUrl: './lap-time.component.html',
  styleUrls: ['./lap-time.component.scss']
})
export class LapTimeComponent implements OnChanges {
  @Input() lap: TrackLap;
  @Input() bestLap: TrackLap;
  @Input() poleLap: TrackLap;
  @Input() isRefLap = false;
  @Input() showGap = true;

  gap;
  poleGap;

  private timingHelper = new TimingHelper();

  constructor() { }

  ngOnChanges() {
    if (this.lap && this.lap.partials && this.lap.partials.length > 0) {
      // TODO: Use timing helper
      if (this.bestLap) {
        this.gap = this.timingHelper.getTrackLapGap(this.lap, this.bestLap);
      }

      // TODO: Use timing helper
      if (this.poleLap) {
        this.poleGap = this.timingHelper.getTrackLapGap(this.lap, this.poleLap);
      } else {
        this.poleGap = this.gap;
      }
    }
  }
}
