// angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { SocketService } from './core/service/socket.service';

// store
import * as fromRoot from './core/reducers/';
import * as fromTiming from './timing/reducers/';
import {
  LoadRaceParticipantTrackActivities,
  SetBestRaceParticipantTrackActivity
} from './timing/actions/race-participant-track-activity.actions';
import { UIActions } from './core/actions';
import { LoadInitialState } from './core/actions/app.actions';

// models
import { RacerSocketEvent } from './shared/model';

@Component({
  selector: 'racer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  socketStatus$: Observable<string>;

  constructor(private socket: SocketService,
    private store: Store<fromTiming.State>) {
  }

  ngOnInit() {

    this.socketStatus$ = this.store
      .select(fromRoot.getSocketStatus)
      .pipe(map(connected => connected ? 'connected' : 'disconnected'));

    // this.socket.connected$
    //   .pipe(map(connected => new UIActions.SetSocketConnected(connected)))
    //   .subscribe(this.store);

    this.socket.listen(RacerSocketEvent.INIT).subscribe((response: any) => {

      if (response) {
        // this.store.dispatch(new LoadInitialState(response));
      }
    });
  }
}
