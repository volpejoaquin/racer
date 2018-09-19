// angular
import { Component, OnInit } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// models
import { AppState } from './app-state';

@Component({
  selector: 'racer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    console.log(store.source);
  }

  ngOnInit(): void {
  }
}
