// angular
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

// models
import {
  TrackActivity,
  IRaceWeekend,
  RaceParticipant,
  RaceParticipantTrackActivity
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

  isExpanded = true;
  isUIExpanded = true;

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
}
