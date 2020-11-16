import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDynamicDotStyles } from "../ComponentStyleHelpers";

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

Dot.propTypes = {
  isActive: PropTypes.bool,
  isCaught: PropTypes.bool,
  areaSize: PropTypes.number,
  dotClick: PropTypes.func,
  dotIndex: PropTypes.number,
  gameData: PropTypes.shape(),
}

export default connect(state => ({
  areaSize: state.gameMode.field,
  gameData: state.gameData,
}))(Dot);