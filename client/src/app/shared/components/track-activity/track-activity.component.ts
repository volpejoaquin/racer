// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// libs

// models
import {
  TrackActivity
} from '../../../shared/model';

// helpers
import {
  FileReaderHelper,
  ImportTimesHelper,
  LogHelper,
  TimingHelper
} from './../../helpers/';

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
  data: any;

  private importHelper = new ImportTimesHelper();
  private timingHelper = new TimingHelper();

  ngOnInit() {
    // TODO: REMOVE THIS
    // simulate upload times
    const fileUrl = 'assets/files/Final-Clase-2.xls';
    const readerHelper = new FileReaderHelper();
    const logHelper = new LogHelper(true);

    logHelper.log('Reading file...');

    readerHelper.convertXLSXToJson(fileUrl, (response: any) => {
      if (!response) {
        logHelper.log('ERROR !');
      } else {
        this.importXlsFile(response);
      }
    });
  }

  ngOnChanges() {
  }

  onImportClick(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (! target.files || target.files.length !== 1) {
     return;
    }

    const readerHelper = new FileReaderHelper();

    readerHelper.readFile(target.files[0], (response: any) => {
      this.importXlsFile(response);
    });
  }

  private importXlsFile(content: string) {
    this.trackActivity.race_participants_track_activities = this.importHelper.importCDAData(content);

    this.trackActivity.best_lap = this.timingHelper.getTrackActivityBestLap(this.trackActivity);
  }
}
