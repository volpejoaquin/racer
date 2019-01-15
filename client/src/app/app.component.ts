// angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, toArray } from 'rxjs/operators';

// services
import { SocketService } from './core/service/socket.service';

// store
import * as fromTiming from './timing/reducers/';
import {
  LoadRaceParticipantTrackActivities,
  SetBestRaceParticipantTrackActivity
} from './timing/actions/race-participant-track-activity.actions';

@Component({
  selector: 'racer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  socketStatus$: Observable<string>;

  constructor(
    private socket: SocketService,
    private store: Store<fromTiming.State>
  ) {
  }

  ngOnInit() {

    // this.socketStatus$ = this.store
    //   .select(fromRoot.getSocketStatus)
    //   .pipe(map(connected => connected ? 'connected' : 'disconnected'));

    // this.socket.connected$
    //   .pipe(map(connected => new UIActions.SetSocketConnected(connected)))
    //   .subscribe(this.store);

    // this.socket.join('11 11 11');

    // this.socket.listen(RacerSocketEvent.INIT).subscribe((response: any) => {

    //   if (response) {
    //     this.store.dispatch(new LoadInitialState(response));
    //   }
    // });

    // this.store.dispatch(new SelectRaceWeekend(1));

    // this.store.dispatch(new SelectTrackActivity(1));
  }
}
