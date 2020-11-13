import { gameSettingsReducer } from './gameSettingsReducer'
import { gameModeReducer } from './gameModeReducer'
import { gameStatusReducer } from './gameStatusReducer'
import { gameDataReducer } from './gameDataReducer'

export const reducers = {
	gameSettings: gameSettingsReducer,
	gameMode: gameModeReducer,
	gameStatus: gameStatusReducer,
	gameData: gameDataReducer,
}