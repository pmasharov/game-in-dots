export const types = {
	ADD_TO_CAUGHT: 'ADD_TO_CAUGHT',
	ADD_TO_MISSED: 'ADD_TO_MISSED',
	CLEAR_DATA: 'CLEAR_DATA',
};

function addToCaught(dotIndex) {
	return {
		type: types.ADD_TO_CAUGHT,
		payload: dotIndex,
	};
}
function addToMissed(dotIndex) {
	return {
		type: types.ADD_TO_MISSED,
		payload: dotIndex,
	};
}
function clearData() {
	return {
		type: types.CLEAR_DATA,
	};
}

export {
	addToCaught,
	addToMissed,
	clearData,
};
