import React, {
	useReducer,
	useContext,
} from 'react';

import AppContext from '../../context';
import { getDynamicDotStyles } from "../ComponentStyleHelpers"

const initialDotState = {
	isDotActive: false,
	isDotCaught: false,
	isDotMissed: false,
};

function dotStateReducer(state, action) {
	switch (action.type) {
		case '':
			return { ...state, count: state.count + 1 };
		case 'decrement':
			return { ...state, count: state.count - 1 };
		case 'toZero':
			return { ...state, count: 0 };
		case 'clearTitle':
			return { ...state, title: '' };
		default:
			throw new Error();
	}
}

function Dot() {
	const [dotState, changeDotState] = useReducer(dotStateReducer, initialDotState);
	const { areaSize } = useContext(AppContext);
	const dotDynamicStyles = getDynamicDotStyles(areaSize)
	const dotClassList = [
		'dot',
		dotState.isDotActive ? 'active' : '',
		dotState.isDotCaught ? 'caught' : '',
		dotState.isDotMissed ? 'missed' : '',
	].join(' ');

	return <div className={dotClassList} style={dotDynamicStyles}/>
}

export default Dot;