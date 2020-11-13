import { types } from "../actions/gameSettings";

const initialState = {};

export function gameSettingsReducer(state = initialState, action) {
	switch (action.type) {
		case types.SET_GAME_SETTINGS:
			return action.payload;
		default:
			return state;
	}
}
