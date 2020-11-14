import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './assets/styles/main.scss';

import constants from "./constants/constants";
import api from './api';

import {
  setGameSettings,
  setGameMode,
  startGame,
  stepGame,
  stopGame,
  addToCaught,
  addToMissed
} from './store/actions';

import { Area, LeaderBoard } from './components';

const { GAME_MODES } = constants

const App = ({
               gameSettings,
               gameMode,
               gameMode: {
                 gameDuration,
                 delay,
                 field
               },
               gameStatus: {
                 isGameStarted,
                 timeRemaining,
               },
               gameData: {
                 caught = [],
                 missed = [],
               },
               onGetGameSettings,
               onChangeGameMode,
               onStartGame,
               onStepGame,
               onStopGame,
               onAddToCaught,
               onAddToMissed,
             }) => {
  const dotsAmount = field ? Math.pow(field, 2) : null

  let interval;

  const [activeDotIndex, changeActiveDotIndex] = useState(getNextActiveDotIndex())
  const [isCaught, changeIsCaught] = useState(false)

  const changeGameMode = e => {
    return onChangeGameMode(gameSettings[e.target.value])
  }

  const setGameSettings = async () => {
    const gameSettings = await api.getGameSettings()
    onGetGameSettings(gameSettings)
    onChangeGameMode(gameSettings[GAME_MODES.EASE_MODE])
  }

  const getGameModeValue = ({ modesObject, currentMode }) => {
    return Object
      .keys(modesObject)
      .find(key => GAME_MODES[key] === currentMode)
  }

  const gameModeConstant = getGameModeValue({ modesObject: GAME_MODES, currentMode: gameMode })

  function getRandomInt({ min, max, caught, missed }) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let newDotIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    if (caught && missed) {
      while (caught.includes(newDotIndex) || missed.includes(newDotIndex)) {
        newDotIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    return newDotIndex;
  }

  function getNextActiveDotIndex(caught, missed) {
    return getRandomInt({
      min: 0,
      max: dotsAmount - 1,
      caught: caught,
      missed: missed,
    })
  }

  const dotClick = dotIndex => {
    changeIsCaught(true)
    onAddToCaught(dotIndex)
  }

  useEffect(() => {
    if (!Object.keys(gameSettings).length) setGameSettings()
  }, [])

  useEffect(() => {
    if (isGameStarted) {

      if (dotsAmount && activeDotIndex === null) {
        changeActiveDotIndex(getNextActiveDotIndex())
      }
      interval = setInterval(() => {
        const remaining = !timeRemaining
          ? gameDuration - delay
          : timeRemaining - delay

        if (!isCaught) {
          onAddToMissed(activeDotIndex);
        }

        changeIsCaught(false)

        changeActiveDotIndex(getNextActiveDotIndex(caught, missed))

        onStepGame(remaining)
      }, delay);

      if (timeRemaining === 0
        || [...caught, ...missed].length === dotsAmount) {
        onStopGame()
        clearInterval(interval)
      }

      return () => clearInterval(interval);
    }
  }, [timeRemaining, dotsAmount, isCaught])

  return (
    <>
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

      <LeaderBoard/>
    </>
  )
}

const mapStateToProps = state => ({
  gameSettings: state.gameSettings,
  gameMode: state.gameMode,
  gameStatus: state.gameStatus,
  gameData: state.gameData,
})

const mapDispatchToProps = dispatch => ({
  onGetGameSettings: gameSettings => {
    dispatch(setGameSettings(gameSettings));
  },
  onChangeGameMode: gameMode => {
    dispatch(setGameMode(gameMode));
  },
  onStartGame: () => {
    dispatch(startGame());
  },
  onStepGame: (remaining) => {
    dispatch(stepGame(remaining));
  },
  onStopGame: () => {
    dispatch(stopGame());
  },
  onAddToCaught: (dotIndex) => {
    dispatch(addToCaught(dotIndex));
  },
  onAddToMissed: (dotIndex) => {
    dispatch(addToMissed(dotIndex));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
