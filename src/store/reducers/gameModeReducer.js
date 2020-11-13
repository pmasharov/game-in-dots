import { types } from "../actions/gameMode";
import constants from "../../constants/constants";

const { GAME_MODES } = constants

const initialState = {};

export function gameModeReducer(state = initialState, action) {
	switch (action.type) {
		case types.SET_GAME_MODE:
			return action.payload
		default:
			return state;
	}
}
