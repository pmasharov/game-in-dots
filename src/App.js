import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  addToMissed,
} from './store/actions';

import { GameBoard, LeaderBoard } from './components';

const { GAME_MODES } = constants

const App = ({
               gameSettings,
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
                 name
               },

               onGetGameSettings,
               onChangeGameMode,
               onStepGame,
               onStopGame,
               onAddToCaught,
               onAddToMissed,
             }) => {
  const dotsAmount = field ? Math.pow(field, 2) : null
  const dotIndexesAmount = dotsAmount - 1
  const computerWon = missed.length > dotIndexesAmount / 2
  const somebodyWon = caught.length > dotIndexesAmount / 2
    || missed.length > dotIndexesAmount / 2

  const intervalRef = useRef(null);

  const [activeDotIndex, changeActiveDotIndex] = useState(getNextActiveDotIndex())

  const setGameSettings = async () => {
    const gameSettings = await api.getGameSettings()
    onGetGameSettings(gameSettings)
    onChangeGameMode(gameSettings[GAME_MODES.DEFAULT_MODE])
  }

  function getRandomInt({ min, max, caught, missed }) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let newDotIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    if (caught && missed) {
      //TODO optimize with each step excluding dot item from different array
      while (caught.includes(newDotIndex) || missed.includes(newDotIndex)) {
        newDotIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    return newDotIndex;
  }

  function getNextActiveDotIndex(caught, missed) {
    return getRandomInt({
      min: 0,
      max: dotIndexesAmount,
      caught: caught,
      missed: missed,
    })
  }

  const dotClick = dotIndex => {
    onAddToCaught(dotIndex)
  }

  useEffect(() => {
    if (!Object.keys(gameSettings).length) setGameSettings()
  }, [])

  useEffect(() => {
    let interval = intervalRef.current
    if (isGameStarted) {

      if (dotsAmount && activeDotIndex === null) {
        changeActiveDotIndex(getNextActiveDotIndex())
      }
      interval = setInterval(() => {
        const remaining = !timeRemaining
          ? gameDuration - delay
          : timeRemaining - delay

        if (!caught.includes(activeDotIndex)) {
          onAddToMissed(activeDotIndex);
        }

        changeActiveDotIndex(getNextActiveDotIndex(caught, missed))

        onStepGame(remaining)
      }, delay);

      if (somebodyWon) {
        clearInterval(interval)
        onStopGame(computerWon ? 'computer' : name)
      }

      return () => clearInterval(interval);
    }
  }, [timeRemaining, dotsAmount, caught, missed])

  return (
    <>
      <div className='wrapper'>
        <GameBoard dotClick={dotClick} activeDotIndex={activeDotIndex}/>
        <LeaderBoard/>
      </div>
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
  onStopGame: name => {
    dispatch(stopGame(name));
  },
  onAddToCaught: (dotIndex) => {
    dispatch(addToCaught(dotIndex));
  },
  onAddToMissed: (dotIndex) => {
    dispatch(addToMissed(dotIndex));
  }
})

App.propTypes = {
  gameSettings: PropTypes.shape(),
  gameMode: PropTypes.shape(),
  gameStatus: PropTypes.shape(),
  gameData: PropTypes.shape(),
  onGetGameSettings: PropTypes.func,
  onChangeGameMode: PropTypes.func,
  onStepGame: PropTypes.func,
  onStopGame: PropTypes.func,
  onAddToCaught: PropTypes.func,
  onAddToMissed: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
