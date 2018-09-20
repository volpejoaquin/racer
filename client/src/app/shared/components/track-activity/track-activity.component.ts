// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// libs
import * as lodash from 'lodash';
import * as XLSX from 'xlsx';

// models
import {
  TrackActivity,
  RaceParticipantTrackActivity
} from '../../../shared/model';

// dummy data
import {
  RACE_PARTICIPANT_TRACK_ACTIVITY_EMPTY_SAMPLE
} from '../../dummy';


@Component({
  selector: 'racer-track-activity',
  templateUrl: './track-activity.component.html',
  styleUrls: ['./track-activity.component.scss']
})
export class TrackActivityComponent implements OnInit, OnChanges {
  @Input() trackActivity: TrackActivity;

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onImportClick() {
    const raceParticipantTrackActivities: RaceParticipantTrackActivity[] = [];

    lodash.times(40, () => {
      raceParticipantTrackActivities.push(lodash.clone(RACE_PARTICIPANT_TRACK_ACTIVITY_EMPTY_SAMPLE));
    });

    this.trackActivity.race_participants_track_activities = raceParticipantTrackActivities;
  }
}
