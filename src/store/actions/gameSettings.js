export const types = {
	SET_GAME_SETTINGS: 'SET_GAME_SETTINGS',
};

function setGameSettings(gameSettings) {
	return {
		type: types.SET_GAME_SETTINGS,
		payload: gameSettings
	};
}

export { setGameSettings };
