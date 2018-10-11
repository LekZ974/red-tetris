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
      console.log('state.coords',state.coords)
      if(state.coords.posY < 20){
        return {
          ...state,
          coords: {
            ...state.coords,
            posY: state.coords.posY + 1
          }
        }
      }else{
        return {
          ...state,
          ...state.coords
        }
      }
    }
    case 'ArrowLeft': {
      if(state.coords.posX > 0){
        return {
          ...state,
          coords: {
            ...state.coords,
            posX: state.coords.posX - 1
          }
        }
      }else{
        return {
          ...state,
          ...state.coords
        }
      }
    }
    case 'ArrowRight': {
      if(state.coords.posX < 10){
        return {
          ...state,
          coords: {
            ...state.coords,
            posX: state.coords.posX + 1
          }
        }
      }else{
        return {
          ...state,
          ...state.coords,
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
