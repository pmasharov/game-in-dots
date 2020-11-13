import axios from "axios"

const pointsSrc = {
	gameSettings: 'https://starnavi-frontend-test-task.herokuapp.com/game-settings'
}

const api = {
	async getGameSettings() {
		try {
			const settingsResp = await axios.get(pointsSrc.gameSettings)
			if (settingsResp.status === 200) {
				return settingsResp.data
			} else {
				throw new Error('Something wrong on the server')
			}
		} catch (error) {
			throw new Error(error)
		}

	}
}

export default api
