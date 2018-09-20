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

  gap;
  poleGap;

  private timingHelper = new TimingHelper();

  constructor() { }

  ngOnChanges() {
    if (this.lap && this.lap.partials && this.lap.partials.length > 0) {
      const lap = lodash.clone(this.lap);
      let lapTime = lap.time;
      const isPartialLap = !lapTime;

      // Sum partials
      if (isPartialLap) {
        lapTime = 0;

        lap.partials.forEach((partial: TrackPartialLap) => {
          lapTime += partial.time;
        });

        lap.time = lapTime;
      }

      // TODO: Use timing helper
      if (this.bestLap) {
        this.gap = this.timingHelper.getTrackLapGap(lap, this.bestLap);
      }

      // TODO: Use timing helper
      if (this.poleLap) {
        this.poleGap = this.timingHelper.getTrackLapGap(lap, this.poleLap);
      } else {
        this.poleGap = this.gap;
      }
    }
  }
}
