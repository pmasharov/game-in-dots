import { types } from "../actions/gameMode";

const initialState = {};

export function gameModeReducer(state = initialState, action) {
	switch (action.type) {
		case types.SET_GAME_MODE:
			const { field, delay } = action.payload
			const gameDuration = Math.pow(field, 2) * delay
			return { ...action.payload, gameDuration }
		default:
			return state;
	}
}
