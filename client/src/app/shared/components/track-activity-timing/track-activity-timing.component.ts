// angular
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

// libs

// models
import {
  TrackActivity,
  RaceParticipantTrackActivity
} from '../../../shared/model';

// helpers
import {
  FileReaderHelper,
  ImportTimesHelper,
  LogHelper
} from './../../helpers/';

// dummy data
import {
  RACE_PARTICIPANT_TRACK_ACTIVITY_EMPTY_SAMPLE
} from '../../dummy';

@Component({
  selector: 'racer-track-activity-timing',
  templateUrl: './track-activity-timing.component.html',
  styleUrls: ['./track-activity-timing.component.scss']
})
export class TrackActivityTimingComponent implements OnInit, OnChanges {
  @Input() trackActivity: TrackActivity;
  @Output() raceParticipantsTrackActivities = new EventEmitter<RaceParticipantTrackActivity[]>();

  private readerHelper = new FileReaderHelper();
  private importHelper = new ImportTimesHelper();
  private logHelper = new LogHelper(false);

  ngOnInit() {
    // TODO: Completar esta pantalla con tiempos importados anteriormente
  }

  ngOnChanges() {
  }

  onSelectFile($event) {
    if (!$event.target || !$event.target.files || !$event.target.files[0]) {
      return;
    }

    this.readerHelper.readFile($event.target.files[0], (data: any) => {
      if (data) {
        this.importFile(data);
      }
    });
  }

  private importFile(data: any) {
    this.readerHelper.convertXLSXToJson(data, (response: any) => {
      if (!response) {
        this.logHelper.log('ERROR !');
      } else {
        this.importXlsFile(response);
      }
    });
  }

  private importXlsFile(content: string) {
    const raceParticipantsTrackActivities = this.importHelper.importCDAData(content, this.trackActivity);

    this.raceParticipantsTrackActivities.emit(raceParticipantsTrackActivities);
  }
}
