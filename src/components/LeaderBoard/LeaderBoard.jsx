import React, { useEffect, useState } from 'react'
import api from '../../api'

const LeaderBoard = () => {
    const [leadersList, changeLeadersList] = useState([])

    const getLeadersData = async () => {
        const leadersData = await api.getLeadersData()
        changeLeadersList(leadersData)
    }

    useEffect(() => {
        getLeadersData()
    }, [])

    const leadersContent = !!leadersList.length && leadersList.map((leaderItem, index) => {
        const { winner, date } = leaderItem
        return (
            <div key={index} className="leader-info-container">
                {winner}
                {date}
            </div>
        )
    })
    return (
        <div className="leader-board">
            <h1 className="leader-board__header">
                Leader Board
            </h1>
            <div className="leader-board__content">
                {leadersContent && leadersContent}
            </div>
        </div>
    )
}

export default LeaderBoard;