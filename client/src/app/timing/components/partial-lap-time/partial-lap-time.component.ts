// angular
import { Component, Input, OnChanges } from '@angular/core';

// models
import {
  TrackPartialLap
} from '../../../shared/model/';

@Component({
  selector: 'racer-partial-lap-time',
  templateUrl: './partial-lap-time.component.html',
  styleUrls: ['./partial-lap-time.component.css']
})
export class PartialLapTimeComponent implements OnChanges {
  @Input() partial: TrackPartialLap;
  @Input() bestPartial: TrackPartialLap;
  @Input() polePartial: TrackPartialLap;
  @Input() isRefLap = false;

  gap;
  poleGap;

  constructor() { }

  ngOnChanges() {
    if (this.partial && this.partial.time) {
      if (this.bestPartial && this.bestPartial.time) {
        this.gap = this.partial.time - this.bestPartial.time;
      }

      if (this.polePartial && this.polePartial.time) {
        this.poleGap = this.partial.time - this.polePartial.time;
      } else {
        this.poleGap = this.gap;
      }
    }
  }
}
