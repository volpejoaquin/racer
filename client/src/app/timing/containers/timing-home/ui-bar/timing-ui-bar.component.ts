// angular
import { Component, OnInit, Input } from '@angular/core';

// models
import {
  RaceParticipant
} from '../../../../shared/model';

export const MAX_UI_MODES_COUNT = 3;

@Component({
  selector: 'racer-timing-ui-bar',
  templateUrl: './timing-ui-bar.component.html',
  styleUrls: ['./timing-ui-bar.component.scss']
})
export class TimingUiBarComponent implements OnInit {
  @Input() raceParticipants: RaceParticipant[];

  currentUIMode = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  nextUIMode() {
    this.currentUIMode = (this.currentUIMode + 1) % MAX_UI_MODES_COUNT;
  }
}
