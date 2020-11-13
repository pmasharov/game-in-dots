import { types } from "../actions/gameStatus";

const initialState = {
	isGameStarted: false,
	timeRemaining: null,
};

export function gameStatusReducer(state = initialState, action) {
	switch (action.type) {
		case types.START_GAME:
			return {
				isGameStarted: true,
			}
		case types.STEP_GAME:
			return {
				...state,
				timeRemaining: action.payload
			}
		case types.STOP_GAME:
			return {
				isGameStarted: false,
				timeRemaining: null
			}
		default:
			return state;
	}
}