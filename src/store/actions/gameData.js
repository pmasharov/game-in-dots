export const types = {
	ADD_TO_CAUGHT: 'ADD_TO_CAUGHT',
	ADD_TO_MISSED: 'ADD_TO_MISSED',
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

export {
	addToCaught,
	addToMissed,
};
