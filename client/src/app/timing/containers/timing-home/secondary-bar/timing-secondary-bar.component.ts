// angular
import { Component, OnInit, Input } from '@angular/core';

// models
import { RaceParticipantTrackActivity } from '../../../../shared/model';

@Component({
  selector: 'racer-timing-secondary-bar',
  templateUrl: './timing-secondary-bar.component.html',
  styleUrls: ['./timing-secondary-bar.component.scss']
})
export class TimingSecondaryBarComponent implements OnInit {
  @Input() title: string;
  @Input() bestTrackActivity: RaceParticipantTrackActivity;

  constructor() {
  }

  ngOnInit(): void {
    // this.initIoConnection();
  }
}
