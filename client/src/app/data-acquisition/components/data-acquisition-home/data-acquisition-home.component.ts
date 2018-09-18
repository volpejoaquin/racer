// angular
import { Component, OnInit, HostListener } from '@angular/core';
import * as lodash from 'lodash';

// models
import { TrackLap } from '../../../shared/model';

// dummy data
import { REF_LAP } from './../../../shared/dummy';
import { SOLO_DATA } from './../../../shared/data';

@Component({
  selector: 'racer-data-acquisition-home',
  templateUrl: './data-acquisition-home.component.html',
  styleUrls: ['./data-acquisition-home.component.scss']
})
export class DataAcquisitionComponent implements OnInit {
  currentLap: TrackLap = REF_LAP;
  bestLap: TrackLap = REF_LAP;
  poleLap: TrackLap = REF_LAP;
  gpsTrackData = SOLO_DATA;
  currentView = 3;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    console.log(keyCode);
  }

  constructor() { }

  ngOnInit(): void {
    // TODO: REMOVE THIS
    this.poleLap = Object.assign({}, this.poleLap);
    this.poleLap.partials[0].time += 200;
    this.poleLap.partials[1].time += 300;
    this.poleLap.partials[2].time -= 100;
    this.poleLap.partials[3].time += 400;

    console.log(this.currentLap);
    console.log(this.bestLap);
    console.log(this.poleLap);
  }
}
