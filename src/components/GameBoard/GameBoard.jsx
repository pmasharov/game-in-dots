import React, { useState } from 'react'
import { connect } from "react-redux";

import constants from "../../constants/constants";
import {
  setGameMode,
  startGame,
  clearDots,
} from "../../store/actions";

import { Area } from "../../components";
import { setUserName } from "../../store/actions/gameData";

const { GAME_MODES } = constants


const GameBoard = ({
                     gameSettings,
                     gameMode: {
                       field
                     },
                     gameStatus: {
                       isGameStarted,
                       isGameEnded
                     },
                     gameData: {
                       caught,
                       missed,
                     },
                     activeDotIndex,

                     dotClick,
                     onStartGame,
                     onSetUserName,
                     onClearDots,
                     onChangeGameMode,
                   }) => {

  const [name, changeName] = useState('')
  const [isNameChanged, changeIsNameChanged] = useState(false)
  const [gameModeKey, changeGameModeKey] = useState(GAME_MODES.DEFAULT_MODE)
  const isDataEmpty = !(caught.length > 0 || missed.length > 0)
  const isGameModeChoose = gameModeKey !== GAME_MODES.DEFAULT_MODE

  const handleChangeGameMode = e => {
    onClearDots()
    changeGameModeKey(e.target.value)
    return onChangeGameMode(gameSettings[e.target.value])
  }

  const handleChangeName = e => {
    changeIsNameChanged(true)
    changeName(e.target.value)
  }

  const isStartAvailable = gameModeKey
    && gameModeKey !== GAME_MODES.DEFAULT_MODE
    && name.length > 0
    && !isGameStarted

  const start = () => {
    onClearDots()
    onSetUserName(name)
    onStartGame()
    changeIsNameChanged(false)
  }

  return (
    <section className='game-wrapper'>
      <section className="controls-wrapper">
        <select
          className={'field item'}
          value={gameModeKey}
          onChange={handleChangeGameMode}
          disabled={isGameStarted}
        >
          <option disabled value={GAME_MODES.DEFAULT_MODE}>Pick game mode</option>
          <option value={GAME_MODES.EASE_MODE}>easy</option>
          <option value={GAME_MODES.NORMAL_MODE}>medium</option>
          <option value={GAME_MODES.HARD_MODE}>hard</option>
        </select>

        <input
          type={'text'}
          className={'field item'}
          value={name}
          onChange={handleChangeName}
          disabled={isGameStarted}
        />

        <button
          className={`button ${isStartAvailable ? 'enabled' : 'disabled'} item`}
          onClick={isStartAvailable ? start : () => {
          }}
        >
          {!isGameEnded ? 'play' : ' play again'}
        </button>
      </section>
      {isGameModeChoose && (
        <>
          <section className="result-message-wrapper item">
            {
              isGameEnded && !isNameChanged && !isDataEmpty && (
                <h2 className='result-message'>
                  {`${caught.length > missed.length ? name : 'Computer'} won`}
                </h2>
              )
            }
          </section>
          <section className='item'>
            <Area
              dotClick={dotClick}
              caughtList={caught}
              missedList={missed}
              isGameStarted={isGameStarted}
              activeDotIndex={activeDotIndex}
            />
          </section>
        </>
      )}
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
  onSetUserName: name => {
    dispatch(setUserName(name));
  },
  onClearDots: () => {
    dispatch(clearDots());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);