import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import * as socketIo from 'socket.io-client';

import { environment } from '../../../environments/environment';

// models
import { BasicSocketEvent } from './../../shared/model';

@Injectable()
export class SocketService {

  private socket: socketIo.Socket;
  connected$ = new ReplaySubject<boolean>(0);

  constructor() {
    this.socket = socketIo(environment.socket.baseUrl, environment.socket.config);
    this.socket.on(BasicSocketEvent.CONNECT, () => this.connected$.next(true));
    this.socket.on(BasicSocketEvent.DISCONNECT, () => this.connected$.next(false));
  }

  disconnect() {
    this.socket.disconnect();
    this.connected$.next(false);
  }

  emit(event: string, data?: any) {

    console.group('[SOCKET] Socket outgoing');
      console.log();
      console.log('Action: ', event);
      console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable( observer => {

      this.socket.on(event, data => {

        console.group('[SOCKET] Socket inbound');
          console.log('Action: ', event);
          console.log('Payload: ', data);
        console.groupEnd();

        observer.next(data);
      });
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }

}
