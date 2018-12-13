
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
        gameIsStarted: true,
        start: false,
        pause: true,
      }
    }
    case 'Stop': {
      return {
        ...state,
        start: false,
        pause: false,
      }
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
