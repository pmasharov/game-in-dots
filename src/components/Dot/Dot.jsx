import React from 'react';
import { connect } from 'react-redux'
import { getDynamicDotStyles } from "../ComponentStyleHelpers"

function Dot({
               isActive,
               isCaught,

               areaSize,
               dotClick,
               dotIndex,

               gameData: {
                 missed,
                 caught
               }
             }) {
  const dotDynamicStyles = getDynamicDotStyles(areaSize)
  const dotClassList = [
    'dot',
    isActive ? 'active' : '',
    caught.includes(dotIndex) ? 'caught' : '',
    missed.includes(dotIndex) ? 'missed' : '',
  ].join(' ');


  const click = () => {
    if (isActive) {
      dotClick(dotIndex)
    }
  }
  return <div
    onClick={isActive && !isCaught
      ? click
      : () => {
      }
    }
    className={dotClassList}
    style={dotDynamicStyles}
  />
}

export default connect(state => ({
  areaSize: state.gameMode.field,
  gameData: state.gameData,
}))(Dot);