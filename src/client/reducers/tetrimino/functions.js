import {PIECES_INFO, PIECES_ACTION} from "../../../common/pieces";
import * as TetriService from "../../services/TetriService";
import {store} from "../../index";
import { GRID_WIDTH } from '../../../common/grid';

const reducerTetriStep = (state, action, initialState) => {
  if (0 === state.pieceStep) {
    state.coords.posY = -1
  }
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
    default: {
      return state
    }
  }
}

export {
  reducerTetriStep,
  reducerTetriAction,
}
