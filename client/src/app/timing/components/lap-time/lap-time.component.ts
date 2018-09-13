// angular
import { Component, Input, OnChanges } from '@angular/core';

// models
import {
  TrackLap,
  TrackPartialLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-lap-time',
  templateUrl: './lap-time.component.html',
  styleUrls: ['./lap-time.component.css']
})
export class LapTimeComponent implements OnChanges {
  @Input() lap: TrackLap;
  @Input() bestLap: TrackLap;
  @Input() poleLap: TrackLap;
  @Input() isRefLap = false;

  gap;
  poleGap;

  constructor() { }

  ngOnChanges() {
    if (this.lap && this.lap.partials && this.lap.partials.length > 0) {
      let lapTime = this.lap.time;
      const isPartialLap = !lapTime;
      let partialCount = isPartialLap ? 0 : this.lap.partials.length;

      // Sum partials
      if (isPartialLap) {
        lapTime = 0;

        this.lap.partials.forEach((partial: TrackPartialLap) => {
          lapTime += partial.time;
          partialCount++;
        })
      }

      if (this.bestLap) {
        let bestLapTime = this.bestLap.time;

        // Sum partials
        if (!bestLapTime || isPartialLap) {
          bestLapTime = 0;

          let partial;
          for (let index = 0; index < partialCount; index++) {
            partial = this.bestLap.partials[index];
            bestLapTime += partial.time;
          }
        }
        this.gap = lapTime - bestLapTime;
      }

      if (this.poleLap) {
        let poleLapTime = this.poleLap.time;

        // Sum partials
        if (!poleLapTime || isPartialLap) {
          poleLapTime = 0;

          let partial;
          for (let index = 0; index < partialCount; index++) {
            partial = this.poleLap.partials[index];
            poleLapTime += partial.time;
          }
        }

        this.poleGap = lapTime - poleLapTime;
      } else {
        this.poleGap = this.gap;
      }
    }
  }
}
