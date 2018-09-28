// angular
import { Component, OnInit, Input } from '@angular/core';

// models
import { RaceParticipantTrackActivity } from '../../../../shared/model';

@Component({
  selector: 'racer-timing-primary-bar',
  templateUrl: './timing-primary-bar.component.html',
  styleUrls: ['./timing-primary-bar.component.scss']
})
export class TimingPrimaryBarComponent implements OnInit {
  @Input() title: string;
  @Input() bestRaceParticipantTrackActivity: RaceParticipantTrackActivity;

  constructor() {
  }

  ngOnInit(): void {
    // this.initIoConnection();
  }
}
