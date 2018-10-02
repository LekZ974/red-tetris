
const reducerTetriStep = (state, action, initialState) => {
  if (!action.game.gameIsStarted) {
    return initialState
  } else {
    return {
      ...state,
      items: action.payload ? action.payload : [],
      pieceStep: state.pieceStep + 1,
      coords:{
        ...state.coords,
        posY: state.coords.posY + 1
      }
    }
  }
}

const reducerTetriAction = (state, action) => {
  switch (action.action) {
    case 'ArrowUp': {
      if (3 === state.rotate) {
        state.rotate = -1
      }
      return {
        ...state,
        rotate: state.rotate + 1
      }
    }
    case 'ArrowDown': {
      if (0 === state.rotate) {
        state.rotate = 4
      }
      return {
        ...state,
        rotate: state.rotate - 1
      }
    }
    case 'ArrowLeft': {
      return {
        ...state,
        coords: {
          ...state.coords,
          posX: state.coords.posX - 1
        }
      }
    }
    case 'ArrowRight': {
      return {
        ...state,
        coords: {
          ...state.coords,
          posX: state.coords.posX + 1
        }
      }
    }
    default: {
      return state
    }
  }
}

export {
  reducerTetriStep,
  reducerTetriAction,
}
