// angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as lodash from 'lodash';

// services
import { SocketService } from './core/service/socket.service';

// store
import * as fromRoot from './core/reducers/';
import * as fromTiming from './timing/reducers/';
import { SelectRaceWeekend } from './timing/actions/race-weekend.actions';
import { SelectTrackActivity } from './timing/actions/track-activitiy.actions';
import {
  LoadRaceParticipantTrackActivities,
  SetBestRaceParticipantTrackActivity
} from './timing/actions/race-participant-track-activity.actions';
import { UIActions } from './core/actions';

// dummy data
import { TP_C3_TRACK_ACTIVITY } from './shared/dummy';

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

    this.socket.connected$
      .pipe(map(connected => new UIActions.SetSocketConnected(connected)))
      .subscribe(this.store);

    this.socket.join('11 11 11');

    this.store.dispatch(new SelectRaceWeekend(1));

    this.store.dispatch(new SelectTrackActivity(1));

    // const data = lodash.orderBy(TP_C3_TRACK_ACTIVITY.race_participants_track_activities, 'best_lap.time');

    // this.store.dispatch(new LoadRaceParticipantTrackActivities(data));

    // this.store.dispatch(new SetBestRaceParticipantTrackActivity(data[0].id));
  }
}
