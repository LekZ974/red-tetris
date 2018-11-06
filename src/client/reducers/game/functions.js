
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

const reducerEmitCreateGame = (state, action) => {
  console.log("REDUCER CREATE GAME", action)
  return {
    ...state,
    name: action.gameName,
  }
}

const reducerEmitGamePieces = (state, action) => {
  return {
    ...state,
  }
}

const reducerGameFlow = (state, action) => {
  return {...state}
}

export {
  reducerEmitGameStatus,
  reducerEmitGamePieces,
  reducerGameFlow,
  reducerEmitCreateGame,
}
