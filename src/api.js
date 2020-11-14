import axios from "axios"

const pointsSrc = {
	gameSettings: 'https://starnavi-frontend-test-task.herokuapp.com/game-settings',
	leadersData: 'https://starnavi-frontend-test-task.herokuapp.com/winners',
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

	},
	async getLeadersData() {
		try {
			const leadersDataResp = await axios.get(pointsSrc.leadersData)
			if (leadersDataResp.status === 200) {
				return leadersDataResp.data
			} else {
				throw new Error('Something wrong on the server')
			}
		} catch (error) {
			throw new Error(error)
		}

	}
}

export default api
