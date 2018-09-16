// angular
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

// dummy data
import { SOLO_DATA } from './../../../shared/data';

@Component({
  selector: 'racer-data-acquisition-home',
  templateUrl: './data-acquisition-home.component.html',
  styleUrls: ['./data-acquisition-home.component.scss']
})
export class DataAcquisitionComponent implements OnInit {
  @ViewChild('gpsRpmLine') gpsRpmLine: ElementRef;

  gpsTrackData = SOLO_DATA;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    console.log(keyCode);
  }

  constructor() { }

  ngOnInit(): void {

    console.log(this.gpsRpmLine.nativeElement);
  }
}
