import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import api from '../../api'

const LeaderBoard = ({
                       leadersData,
                       dispatch,
                     }) => {
  const [seeAll, changeSeeAll] = useState(false)
  const defaultVisibleResultsCount = 5;

  const toggleSeeAll = () => {
    changeSeeAll(!seeAll)
  }

  const getLeadersData = async () => {
    const leadersData = await api.getLeadersData(dispatch)
    return leadersData
  }

  useEffect(() => {
    getLeadersData()
  }, [])

  const leadersContent = leadersData && !!leadersData.length && leadersData.map((leaderItem, index) => {
    const { winner, date } = leaderItem
    return !seeAll ? index < defaultVisibleResultsCount ? (
      <li key={index} className="leader-board__content-item">
        <span>{winner}</span>
        <span>{date}</span>
      </li>
    ) : null : (
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
            <span>Leader Board</span>
            <span className='collapse-control' onClick={toggleSeeAll}>
              {!seeAll ? 'See all results' : 'See less'}
            </span>
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