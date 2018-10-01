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
    invisible: [110, 76],
    dimmed: [91]
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

      const newState = Object.assign({}, state);

      let numberIndex = newState.raceParticipants.dimmed.indexOf(action.payload);
      if (numberIndex >= 0) {
        newState.raceParticipants.dimmed.splice(numberIndex, 1);
      }

      numberIndex = newState.raceParticipants.invisible.indexOf(action.payload);
      if (numberIndex >= 0) {
        newState.raceParticipants.invisible.splice(numberIndex, 1);
      }

      return newState;
    }

    case uiActions.HIDE_RACE_PARTICIPANT : {
      const newState = Object.assign({}, state),
        numberIndex = newState.raceParticipants.dimmed.indexOf(action.payload);
      if (numberIndex >= 0) {
        newState.raceParticipants.dimmed.splice(numberIndex, 1);
      }

      newState.raceParticipants.invisible.push(action.payload);

      return newState;
    }

    case uiActions.DIM_RACE_PARTICIPANT : {
      const newState = Object.assign({}, state),
        numberIndex = newState.raceParticipants.invisible.indexOf(action.payload);
      if (numberIndex >= 0) {
        newState.raceParticipants.invisible.splice(numberIndex, 1);
      }

      newState.raceParticipants.dimmed.push(action.payload);

      return newState;
    }
    default : return state;
  }

}

export const getSocketStatus = (state: State): boolean => state.socketConnected;

export const getInvisibleRaceParticipants = (state: State) => state.raceParticipants.invisible;
export const getDimmedRaceParticipants = (state: State) => state.raceParticipants.dimmed;
