import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
      this.socket = socketIo(SERVER_URL);
    }

    public onEvent(event: any): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on(event, (data: any) => observer.next(data));
      });
    }
}
