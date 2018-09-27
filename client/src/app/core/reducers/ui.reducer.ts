import * as uiActions from '../actions/ui.actions';

export interface State {
  socketConnected: boolean;
  raceParticipants: {
    invisible: number[],
    dimmed: number[]
  };
}

export const INIT_STATE: State = {
  socketConnected: false,
  raceParticipants: {
    invisible: [42],
    dimmed: [14]
  }
};

export function reducer(state = INIT_STATE, action: uiActions.All): State {

  switch (action.type) {
    case uiActions.SET_SOCKET_CONECTED : {
      return {
        ...state,
        socketConnected: action.payload
      };
    }

    case uiActions.SHOW_RACE_PARTICIPANT : {
      return {
        ...state
      };
    }

    case uiActions.HIDE_RACE_PARTICIPANT : {
      return {
        ...state
      };
    }

    case uiActions.DIM_RACE_PARTICIPANT : {
      return {
        ...state
      };
    }
    default : return state;
  }

}

export const getSocketStatus = (state: State): boolean => state.socketConnected;

export const getInvisibleRaceParticipants = (state: State) => state.raceParticipants.invisible;
export const getDimmedRaceParticipants = (state: State) => state.raceParticipants.dimmed;
