// angular
import {
  ElementRef,
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild
} from '@angular/core';

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

@Component({
  selector: 'racer-track-activity-timing',
  templateUrl: './track-activity-timing.component.html',
  styleUrls: ['./track-activity-timing.component.scss']
})
export class TrackActivityTimingComponent implements OnInit, OnChanges {
  @Input() trackActivity: TrackActivity;
  @ViewChild('selectFileInput') selectFileInput: ElementRef;
  @Output() raceParticipantsTrackActivities = new EventEmitter<RaceParticipantTrackActivity[]>();

  private readerHelper = new FileReaderHelper();
  private importHelper = new ImportTimesHelper();
  private logHelper = new LogHelper(false);

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;
    const shiftKey = event.shiftKey;

    switch (keyCode) {
      case 73:
        if (shiftKey && this.selectFileInput) {
          this.selectFileInput.nativeElement.click();
        }
        break;
    }
  }

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

  onClear() {
    this.import([]);
  }

  private importFile(data: any) {
    this.readerHelper.convertXLSXToJson(data, (response: any) => {
      if (!response) {
        this.logHelper.log('ERROR !');
      } else {
        const raceParticipantsTrackActivities = this.importHelper.importCDAData(response, this.trackActivity);

        this.import(raceParticipantsTrackActivities);
      }
    });
  }

  private import(raceParticipantsTrackActivities: RaceParticipantTrackActivity[]) {
    this.raceParticipantsTrackActivities.emit(raceParticipantsTrackActivities);
  }
}
