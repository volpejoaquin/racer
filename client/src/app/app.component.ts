// angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// services
import { SocketService } from './core/service/socket.service';

// modules
import * as fromTiming from './timing/reducers/';
import { SelectRaceWeekend } from './timing/actions/race-weekend.actions';
import { SelectTrackActivity } from './timing/actions/track-activitiy.actions';

@Component({
  selector: 'racer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private socketService: SocketService,
    private store: Store<fromTiming.State>) {

    store.subscribe((state: any) => {
      console.log(state);
      // // Check if selected track activity is set
      // if (state.selected_) {
      //   this.loadTrackActivity(state.timing.selected_track_activity);
      // }
    });
  }

  ngOnInit(): void {

    this.store.dispatch(new SelectRaceWeekend(1));

    this.store.dispatch(new SelectTrackActivity(1));
  }
}
