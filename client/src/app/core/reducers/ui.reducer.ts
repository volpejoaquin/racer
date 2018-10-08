import * as uiActions from '../actions/ui.actions';
import * as lodash from 'lodash';

export interface RaceParticipantsState {
  invisible: number[];
  dimmed: number[];
  marked: number[];
}

export interface State {
  socketConnected: boolean;
  raceParticipants: RaceParticipantsState;
}

export const INIT_STATE: State = {
  socketConnected: false,
  raceParticipants: {
    invisible: [],
    dimmed: [],
    marked: [80]
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

      let numberIndex;
      lodash.values(newState.raceParticipants).forEach((list: any) => {
        numberIndex = list.indexOf(action.payload);
        if (numberIndex >= 0) {
          list.splice(numberIndex, 1);
        }
      });

      return newState;
    }

    case uiActions.HIDE_RACE_PARTICIPANT : {
      const newState = Object.assign({}, state);

      let numberIndex;
      lodash.values(newState.raceParticipants).forEach((list: any) => {
        numberIndex = list.indexOf(action.payload);
        if (numberIndex >= 0) {
          list.splice(numberIndex, 1);
        }
      });

      newState.raceParticipants.invisible.push(action.payload);

      return newState;
    }

    case uiActions.DIM_RACE_PARTICIPANT : {
      const newState = Object.assign({}, state);

      let numberIndex;
      lodash.values(newState.raceParticipants).forEach((list: any) => {
        numberIndex = list.indexOf(action.payload);
        if (numberIndex >= 0) {
          list.splice(numberIndex, 1);
        }
      });

      newState.raceParticipants.dimmed.push(action.payload);

      return newState;
    }

    case uiActions.MARK_RACE_PARTICIPANT : {
      const newState = Object.assign({}, state);

      let numberIndex;
      lodash.values(newState.raceParticipants).forEach((list: any) => {
        numberIndex = list.indexOf(action.payload);
        if (numberIndex >= 0) {
          list.splice(numberIndex, 1);
        }
      });

      newState.raceParticipants.marked.push(action.payload);

      return newState;
    }
    default : return state;
  }

}

export const getSocketStatusState = (state: State): boolean => state.socketConnected;

export const getRaceParticipantsState = (state: State): RaceParticipantsState => state.raceParticipants;
