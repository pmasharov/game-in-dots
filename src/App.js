import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './assets/styles/main.scss';

import constants from "./constants/constants";
import api from './api';

import {
	setGameSettings,
	setGameMode,
	startGame,
	stepGame,
	stopGame
} from './store/actions';

import { Area } from './components';

const { GAME_MODES } = constants

const App = ({
							 gameSettings,
							 gameMode,
							 gameMode: {
								 gameDuration,
								 delay
							 },
							 gameStatus: {
								 isGameStarted,
								 timeRemaining,
							 },
							 onGetGameSettings,
							 onChangeGameMode,
							 onStartGame,
							 onStepGame,
							 onStopGame,
						 }) => {
	let interval;
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
		if (!Object.keys(gameSettings).length) setGameSettings()

		if (isGameStarted) {
			interval = setInterval(() => {
				const remaining = !timeRemaining
					? gameDuration - delay
					: timeRemaining - delay
				onStepGame(remaining)
			}, delay);

			if (timeRemaining === 0) {
				onStopGame()
				clearInterval(interval)
			}

			return () => clearInterval(interval);
		}

	}, [timeRemaining])

	return (
		<>
			<select value={gameModeConstant} onChange={changeGameMode}>
				<option value={GAME_MODES.EASE_MODE}>easy</option>
				<option value={GAME_MODES.NORMAL_MODE}>medium</option>
				<option value={GAME_MODES.HARD_MODE}>hard</option>
			</select>
			<button
				onClick={isGameStarted
					? onStopGame
					: onStartGame
				}>
				{isGameStarted
					? 'stop'
					: 'start'
				}
			</button>
			{Object.keys(gameMode).length && <Area isGameStarted={isGameStarted}/>}
		</>
	)
}

const mapStateToProps = state => ({
	gameSettings: state.gameSettings,
	gameMode: state.gameMode,
	gameStatus: state.gameStatus,
})

const mapDispatchToProps = dispatch => ({
	onGetGameSettings: gameSettings => {
		dispatch(setGameSettings(gameSettings));
	},
	onChangeGameMode: gameMode => {
		dispatch(setGameMode(gameMode));
	},
	onStartGame: () => {
		dispatch(startGame());
	},
	onStepGame: (remaining) => {
		dispatch(stepGame(remaining));
	},
	onStopGame: () => {
		dispatch(stopGame());
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
