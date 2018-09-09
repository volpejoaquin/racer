export enum BasicSocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

export enum TimingSocketEvent {
  GO_TO_TRACK = 'go to track',
  GO_TO_PIT = 'go to pit',
  PARTIAL_LAP_TIME = 'partial lap time',
  LAP_TIME = 'lap time'
}

export type SocketEvent = BasicSocketEvent | TimingSocketEvent;
