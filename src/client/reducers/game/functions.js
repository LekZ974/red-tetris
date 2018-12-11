
const reducerEmitGameStatus = (state, action, initialState) => {
  switch (action.gameStatus) {
    case 'Start': {
      return {
        ...state,
        items: action.payload,
        start: true,
        gameIsStarted: true,
        pause: false
      }
    }
    case 'Pause': {
      return {
        ...state,
        items: action.payload,
        start: false,
        pause: true,
        gameIsStarted: true,
      }
    }
    case 'Stop': {
      return initialState
    }
    default: return state
  }
}

const reducerRcvCreateGame = (state, action) => {
  return {
    ...state,
    round: state.round + 1,
    isLoading: false,
  }
}

export {
  reducerEmitGameStatus,
  reducerRcvCreateGame,
}
