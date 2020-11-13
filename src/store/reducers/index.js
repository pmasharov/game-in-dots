import { gameSettingsReducer } from './gameSettingsReducer'
import { gameModeReducer } from './gameModeReducer'
import { gameStatusReducer } from './gameStatusReducer'

export const reducers = {
	gameSettings: gameSettingsReducer,
	gameMode: gameModeReducer,
	gameStatus: gameStatusReducer,
}