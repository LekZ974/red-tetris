import { GAME_STATUS } from '../../../common/const';

const reducerEmitGameStatus = (state, action) => {
  switch (action.gameStatus) {
    case GAME_STATUS.start : {
      return {
        ...state,
        items: action.payload,
        start: true,
        gameIsStarted: true,
        pause: false
      }
    }
    case GAME_STATUS.pause: {
      return {
        ...state,
        items: action.payload,
        gameIsStarted: true,
        start: false,
        pause: true,
      }
    }
    case GAME_STATUS.stop: {
      return {
        ...state,
        start: false,
        pause: false,
      }
    }
    default: return state
  }
}

const reducerRcvCreateGame = (state) => {
  return {
    ...state,
    round: state.round + 1,
    isLoading: false,
  }
}

const reducerEmitCreateGame = (state, action) => {
  return {
    ...state,
    name: action.gameName,
    isLoading: true,
  }
}

const reducerRcvGameCanRestart = (state) => {
  return {
    ...state,
    gameIsStarted: false,
    round: state.round + 1,
  }
}

const reducerGameInit = (state) => {
  return {
    ...state,
    owner: '',
    gameIsStarted: false,
    start: false,
    pause: false,
    params: {
      ...state.params,
    },
    isLoading: false,
  }
}

const reducerGameUpdate = (state, action) => {
  return {
    ...state,
    ...action.data,
  }
}

const reducerGameSound = (state) => {
  return {
    ...state,
    params: {
      ...state.params,
      sound: !state.params.sound,
    },
  }
}


const reducerGameIsFinished = (state) => {
  return {
    ...state,
    gameIsStarted: false,
    start: false,
    params: {
      ...state.params,
    },
    isLoading: false,
  }
}

export {
  reducerEmitGameStatus,
  reducerRcvCreateGame,
  reducerEmitCreateGame,
  reducerGameInit,
  reducerGameSound,
  reducerGameUpdate,
  reducerRcvGameCanRestart,
  reducerGameIsFinished,
}
