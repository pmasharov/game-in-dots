export const types = {
	START_GAME: 'START_GAME',
	STEP_GAME: 'STEP_GAME',
	STOP_GAME: 'STOP_GAME',
};

function startGame() {
	return {
		type: types.START_GAME,
	};
}

function stepGame(payload) {
	return {
		type: types.STEP_GAME,
		payload
	};
}

function stopGame(name) {
	return {
		type: types.STOP_GAME,
		payload: name
	};
}

export {
	startGame,
	stepGame,
	stopGame
};
