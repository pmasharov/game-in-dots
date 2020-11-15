import { types } from "../actions/gameData";

const initialState = {
	caught: [],
	missed: [],
};

export function gameDataReducer(state = initialState, action) {
	switch (action.type) {
		case types.ADD_TO_CAUGHT:
			return {
				...state,
				caught: [...state.caught, action.payload]
			}
		case types.ADD_TO_MISSED:
			return {
				...state,
				missed: [...state.missed, action.payload]
			}
			case types.CLEAR_DATA:
			return initialState
		default:
			return state;
	}
}
