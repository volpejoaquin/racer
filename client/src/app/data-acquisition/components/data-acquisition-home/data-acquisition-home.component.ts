// angular
import { Component, OnInit, HostListener } from '@angular/core';

// dummy data
import { GPS_TRACK_DATA } from './../../../shared/dummy';

@Component({
  selector: 'racer-data-acquisition-home',
  templateUrl: './data-acquisition-home.component.html',
  styleUrls: ['./data-acquisition-home.component.scss']
})
export class DataAcquisitionComponent implements OnInit {

  gpsTrackData = GPS_TRACK_DATA;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    console.log(keyCode);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
