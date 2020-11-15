import { types } from "../actions/gameMode";

const initialState = {
	field: 0,
	delay: 0,
};

export function gameModeReducer(state = initialState, action) {
	switch (action.type) {
		case types.SET_GAME_MODE:
			if (!action.payload) {
				const gameDuration = Math.pow(state.field, 2) * state.delay
				return { ...state, gameDuration }
			} else {
				const { field, delay } = action.payload
				const gameDuration = Math.pow(field, 2) * delay
				return { ...action.payload, gameDuration }
			}
		default:
			return state;
	}
}
