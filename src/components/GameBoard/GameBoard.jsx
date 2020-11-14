import React from 'react'
import { connect } from "react-redux";

import constants from "../../constants/constants";
import {
  setGameMode,
  startGame,
  stopGame
} from "../../store/actions";

import { Area } from "../../components";

const { GAME_MODES } = constants


const GameBoard = ({
                     gameSettings,
                     gameMode,
                     gameStatus: {
                       isGameStarted
                     },
                     gameData: {
                       caught,
                       missed,
                     },
                     activeDotIndex,

                     dotClick,
                     onStopGame,
                     onStartGame,
                     onChangeGameMode,
                   }) => {
  const changeGameMode = e => {
    return onChangeGameMode(gameSettings[e.target.value])
  }

  const getGameModeValue = ({ modesObject, currentMode }) => {
    return Object
      .keys(modesObject)
      .find(key => GAME_MODES[key] === currentMode)
  }

  const gameModeConstant = getGameModeValue({ modesObject: GAME_MODES, currentMode: gameMode })

  return (
    <div className='game-wrapper'>
      <select value={gameModeConstant} onChange={changeGameMode}>
        <option value={GAME_MODES.EASE_MODE}>easy</option>
        <option value={GAME_MODES.NORMAL_MODE}>medium</option>
        <option value={GAME_MODES.HARD_MODE}>hard</option>
      </select>

      <button onClick={isGameStarted ? onStopGame : onStartGame}>
        {isGameStarted ? 'stop' : 'start'}
      </button>

      {
        !!Object.keys(gameMode).length ? (
            <Area
              dotClick={dotClick}
              caughtList={caught}
              missedList={missed}
              isGameStarted={isGameStarted}
              activeDotIndex={activeDotIndex}
            />
          )
          : null
      }
    </div>
  )
}

const mapStateToProps = state => ({
  gameSettings: state.gameSettings,
  gameMode: state.gameMode,
  gameStatus: state.gameStatus,
  gameData: state.gameData,
})

const mapDispatchToProps = dispatch => ({
  onChangeGameMode: gameMode => {
    dispatch(setGameMode(gameMode));
  },
  onStartGame: () => {
    dispatch(startGame());
  },
  onStopGame: () => {
    dispatch(stopGame());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);