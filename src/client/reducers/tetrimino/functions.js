import {PIECES_INFO} from "../../../common/pieces";

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
  let rotate = state.rotate;
  switch (action.action) {
    case 'ArrowUp': {
      rotate += 1
      if (4 === rotate) {
        rotate = 0
      }
      return {
        ...state,
        rotate: rotate,
        pieceInfo: PIECES_INFO[5][rotate]
      }
    }
    case 'ArrowDown': {
      rotate += -1
      if (-1 === rotate) {
        rotate = 3
      }
      return {
        ...state,
        rotate: rotate,
        pieceInfo: PIECES_INFO[5][rotate]
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