import moment from 'moment'
import { types } from "../actions/gameStatus";
import api from "../../api";
import { dispatch } from "../store";

const initialState = {
  isGameStarted: false,
  timeRemaining: null,
};

export function gameStatusReducer(state = initialState, action) {
  switch (action.type) {
    case types.START_GAME:
      return {
        isGameStarted: true,
        isGameEnded: false,
      }
    case types.STEP_GAME:
      return {
        ...state,
        timeRemaining: action.payload
      }
    case types.STOP_GAME:
      api.sendLeadersData({
      	winner: action.payload,
      	date: moment().format('h:mm a, DD/MM/YYYY '),
      }, dispatch)
      return {
        isGameStarted: false,
        isGameEnded: true,
        timeRemaining: null
      }
    default:
      return state;
  }
}
