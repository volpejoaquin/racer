// libs
import { createServer, Server } from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as socketIo from 'socket.io';

// models
import { BasicSocketEvent, RacerSocketEvent } from './interfaces';
import { SocketSession } from './modules';

export class RacerServer {
  public static readonly PORT:number = 3001;
  public static readonly MONGO_URL: string = 'mongodb://localhost:27017/racer';

  // private properties
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private socketSessions: any = {};

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.mongoSetup();
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
    this.port = process.env.PORT || RacerServer.PORT;

    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(RacerServer.MONGO_URL, { useNewUrlParser: true });        
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    console.log('Listening...');
    this.server.listen(this.port, () => {
        console.log('INFO - Running server on port %s', this.port);
    });

    this.io.on(BasicSocketEvent.CONNECT, (socket: SocketIO.Socket) => {
      console.log('EVENT - [' + BasicSocketEvent.CONNECT + '] Connected client on port %s.', this.port);

      socket.on(RacerSocketEvent.JOIN, (response: any) => {
        if (!response) {
          return;
        }

        this.onJoin(socket, response.code);
      })
    });
  }

  private onJoin(socket: SocketIO.Socket, code: string) {
    console.log('EVENT - [' + RacerSocketEvent.JOIN + '] Client joined %s.', code);

    let socketSession: SocketSession;

    // create and add socket session
    socketSession = new SocketSession(socket, code);
    this.socketSessions[code] = socketSession;

    socket.on(BasicSocketEvent.DISCONNECT, (response) => {
      console.log(response);
      console.log('EVENT - [' + BasicSocketEvent.DISCONNECT + '] Client disconnected. Session code:', code);
    });
  }
}
