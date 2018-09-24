// libs
import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

// models
import { BasicSocketEvent } from './model';

// dummy data
import { TimingDummy } from './dummy/timing-dummy';

export class TimingServer {
  public static readonly PORT:number = 3001;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  public getApp(): express.Application {
    return this.app;
  }

  // Private methods
  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || TimingServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
        console.log('Running server on port %s', this.port);
    });

    this.io.on(BasicSocketEvent.CONNECT, (socket: any) => {
      console.log('Connected client on port %s.', this.port);

      // Simulate timing
      // const timingDummy = new TimingDummy(this.io);
      // timingDummy.start();

      socket.on(BasicSocketEvent.DISCONNECT, () => {
        console.log('Client disconnected');
        // timingDummy.stop();
      });
    });
  }
}
