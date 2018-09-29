// angular
import { Component, OnInit, Input } from '@angular/core';

// models
import {
  TrackActivity,
  RaceWeekend
} from '../../../../shared/model';

@Component({
  selector: 'racer-timing-secondary-bar',
  templateUrl: './timing-secondary-bar.component.html',
  styleUrls: ['./timing-secondary-bar.component.scss']
})
export class TimingSecondaryBarComponent implements OnInit {
  @Input() raceWeekend: RaceWeekend;
  @Input() trackActivity: TrackActivity;

  isExpanded = false; // TODO: REVERT THIS

  constructor() {
  }

  ngOnInit(): void {
  }
}
