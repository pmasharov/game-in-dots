import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import api from '../../api'

const LeaderBoard = ({
                       leadersData,
                       dispatch,
                     }) => {
  const getLeadersData = async () => {
    const leadersData = await api.getLeadersData(dispatch)
    return leadersData
  }

  useEffect(() => {
    getLeadersData()
  }, [])
console.log('leadersData -> LeaderBoard -> : leadersData', leadersData);
  const leadersContent = leadersData && !!leadersData.length && leadersData.map((leaderItem, index) => {
    const { winner, date } = leaderItem
    return (
      <li key={index} className="leader-board__content-item">
        <span>{winner}</span>
        <span>{date}</span>
      </li>
    )
  })
  return (
    <>
      {leadersContent && <div className="leader-board">
        <section className="leader-board__header-wrapper">
          <h1 className="leader-board__header">
            Leader Board
          </h1>
        </section>
        <ul className="leader-board__content">
          {leadersContent && leadersContent}
        </ul>
      </div>}
      </>
  )
}

export default connect(state => ({
  leadersData: state.gameData.leadersData
}))(LeaderBoard);