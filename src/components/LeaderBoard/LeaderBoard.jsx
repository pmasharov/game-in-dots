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
      <li key={index} className="leader-board__content-item">
        <span>{winner}</span>
        <span>{date}</span>
      </li>
    )
  })
  return (
    <div className="leader-board">
      <section className="leader-board__header-wrapper">
        <h1 className="leader-board__header">
          Leader Board
        </h1>
      </section>
      <ul className="leader-board__content">
        {leadersContent && leadersContent}
      </ul>
    </div>
  )
}

export default LeaderBoard;