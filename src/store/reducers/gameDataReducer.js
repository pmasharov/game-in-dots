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
    case types.SET_USER_NAME:
      const name = action.payload
			return {
				...state,
				name
			}
			case types.GET_LEADERS_DATA:
      const leadersData = action.payload
			return {
				...state,
				leadersData
			}
		case types.CLEAR_DOTS:
			return {
				...state,
				missed: [],
				caught: [],
			}
		default:
			return state;
	}
}
