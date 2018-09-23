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
  selector: 'racer-track-activity-timing',
  templateUrl: './track-activity-timing.component.html',
  styleUrls: ['./track-activity-timing.component.scss']
})
export class TrackActivityTimingComponent implements OnInit, OnChanges {
  @Input() trackActivity: TrackActivity;
  fileUrl = 'assets/files/1ra-Clasi-Clase-3.xls';

  private readerHelper = new FileReaderHelper();
  private importHelper = new ImportTimesHelper();
  private timingHelper = new TimingHelper();
  private logHelper = new LogHelper(true);

  ngOnInit() {
    // TODO: Completar esta pantalla con tiempos importados anteriormente
  }

  ngOnChanges() {
  }

  onImportClick() {
    this.logHelper.log('Reading file...');

    this.readerHelper.convertXLSXToJson(this.fileUrl, (response: any) => {
      if (!response) {
        this.logHelper.log('ERROR !');
      } else {
        this.importXlsFile(response);
      }
    });
  }

  private importXlsFile(content: string) {
    this.trackActivity.race_participants_track_activities = this.importHelper.importCDAData(content);

    this.trackActivity.best_lap = this.timingHelper.getTrackActivityBestLap(this.trackActivity);
  }
}
