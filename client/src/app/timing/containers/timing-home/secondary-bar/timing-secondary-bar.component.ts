// angular
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';

// models
import {
  TrackActivity,
  RaceParticipant,
  RaceParticipantTrackActivity,
  TrackActivityState
} from '../../../../shared/model';

// actions
import * as fromTiming from './../../../reducers/';

@Component({
  selector: 'racer-timing-secondary-bar',
  templateUrl: './timing-secondary-bar.component.html',
  styleUrls: ['./timing-secondary-bar.component.scss']
})
export class TimingSecondaryBarComponent implements OnInit {
  @Input() trackActivity: TrackActivity;
  @Input() raceParticipants: RaceParticipant[];

  isExpanded = false;
  isUIExpanded = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;
    switch (keyCode) {
      case 187:
        this.isUIExpanded = !this.isUIExpanded;
        break;
    }
  }

  constructor(private store: Store<fromTiming.State>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromTiming.getRaceParticipantsTrackActivitiesArray)).subscribe(
      (raceParticipantsTrackActivities: RaceParticipantTrackActivity[]) => {
        if (raceParticipantsTrackActivities && raceParticipantsTrackActivities.length > 0) {
          this.isExpanded = false;
        }
      }
    );
  }

  isTrackActivityStarted(): boolean {
    return this.trackActivity && this.trackActivity.state === TrackActivityState.started;
  }

  isTrackActivityFinished(): boolean {
    return this.trackActivity && this.trackActivity.state === TrackActivityState.finished;
  }
}
