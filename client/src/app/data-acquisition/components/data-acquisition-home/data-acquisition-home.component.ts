// angular
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'racer-data-acquisition-home',
  templateUrl: './data-acquisition-home.component.html',
  styleUrls: ['./data-acquisition-home.component.scss']
})
export class DataAcquisitionComponent implements OnInit {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    console.log(keyCode);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
