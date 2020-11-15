import React, { useState } from 'react'
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
  const [name, changeName] = useState('')

  const changeGameMode = e => {
    return onChangeGameMode(gameSettings[e.target.value])
  }

  // const getGameModeValue = ({ modesObject, pickedMode }) => {
  //   return Object
  //     .keys(modesObject)
  //     .find(key => GAME_MODES[key] === pickedMode)
  // }

  // const gameModeConstant = getGameModeValue({ modesObject: GAME_MODES, pickedMode: gameMode })
  // const isStartAvailable = gameModeConstant && name.length > 0
  const isStartAvailable = true
  return (
    <section className='game-wrapper'>
      <section className="controls-wrapper">
        <select
          className={'field'}
          defaultValue={GAME_MODES.DEFAULT_MODE}
          // value={gameModeConstant}
          onChange={changeGameMode}
        >
          <option disabled value={GAME_MODES.DEFAULT_MODE}>Pick game mode</option>
          <option value={GAME_MODES.EASE_MODE}>easy</option>
          <option value={GAME_MODES.NORMAL_MODE}>medium</option>
          <option value={GAME_MODES.HARD_MODE}>hard</option>
        </select>

        <input
          type={'text'}
          className={'field'}
          value={name}
          onChange={e => changeName(e.target.value)}
        />

        <button
          // disabled={isStartAvailable}
          className={`button ${isStartAvailable ? 'enabled' : 'disabled'}`}
          onClick={/*isStartAvailable ? */onStartGame/* : () => {
        }*/}
        >
          {isGameStarted ? 'stop' : 'play'}
        </button>
      </section>
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
    </section>
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