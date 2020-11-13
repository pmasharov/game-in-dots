export const types = {
	SET_GAME_MODE: 'SET_GAME_MODE',
};

function setGameMode(gameMode) {
	return {
		type: types.SET_GAME_MODE,
		payload: gameMode,
	};
}

export {
	setGameMode,
};
