import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './assets/styles/main.scss';

import constants from "./constants/constants";
import api from './api';

import { setGameSettings, setGameMode } from './store/actions';

import { Area } from './components';

const App = ({ onGetGameSettings, onChangeGameMode, gameMode, gameSettings }) => {
	const { GAME_MODES } = constants

	const changeGameMode = e => onChangeGameMode(gameSettings[e.target.value])

	const setGameSettings = async () => {
		const gameSettings = await api.getGameSettings()
		onGetGameSettings(gameSettings)
		onChangeGameMode(gameSettings[GAME_MODES.EASE_MODE])
	}

	const getGameModeValue = ({ modesObject, currentMode }) => {
		return Object
			.keys(modesObject)
			.find(key => GAME_MODES[key] === currentMode)
	}

	const gameModeConstant = getGameModeValue({ modesObject: GAME_MODES, currentMode: gameMode })

	useEffect(() => {
		setGameSettings()
	}, [])

	return (
		<>
			<select value={gameModeConstant} onChange={changeGameMode}>
				<option value={GAME_MODES.EASE_MODE}>easy</option>
				<option value={GAME_MODES.NORMAL_MODE}>medium</option>
				<option value={GAME_MODES.HARD_MODE}>hard</option>
			</select>
			{Object.keys(gameMode).length && <Area/>}
		</>
	)
}

const mapStateToProps = state => ({
	gameSettings: state.gameSettings,
	gameMode: state.gameMode,
})

const mapDispatchToProps = dispatch => ({
	onGetGameSettings: gameSettings => {
		dispatch(setGameSettings(gameSettings));
	},
	onChangeGameMode: gameMode => {
		dispatch(setGameMode(gameMode));
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
