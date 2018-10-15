import {PIECES_INFO} from "../../../common/pieces";
import * as TetriService from "../../services/TetriService";
import {store} from "../../index";
import { GRID_WIDTH } from '../../../common/grid';

const TETRI_ACTION = {
  ROTATE_LEFT: "rotate_left",
  ROTATE_RIGHT: "rotate_right",
  MOVE_LEFT: "move_left",
  MOVE_RIGHT: "move_right",
  MOVE_DOWN: "move_down",
  MOVE_DROP: "move_drop",
};

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
        action: TETRI_ACTION.ROTATE_LEFT,
        rotate: rotate,
        pieceInfo: PIECES_INFO[5][rotate]
      }
    }
    case 'ArrowDown': {
      return {
        ...state,
        action: TETRI_ACTION.MOVE_DOWN,
        coords: {
          ...state.coords,
        posY: state.coords.posY + 1,
        }
      }
    }
    case 'ArrowLeft': {
      let newPosX = state.coords.posX - 1
      if (newPosX < 0) {
        newPosX = 0;
      }
      return {
        ...state,
        action: TETRI_ACTION.MOVE_LEFT,
        coords: {
          ...state.coords,
          posX: newPosX
        }
      }
    }
    case 'ArrowRight': {
      let newPosX = state.coords.posX + 1
      if (newPosX > GRID_WIDTH - state.pieceInfo.info.width) {
        newPosX = GRID_WIDTH - state.pieceInfo.info.width;
      }
      return {
        ...state,
        action: TETRI_ACTION.MOVE_RIGHT,
        coords: {
          ...state.coords,
          posX: newPosX
        }
      }
    }
    case 'Space': {
      return {
        ...state,
        action: TETRI_ACTION.MOVE_DROP,
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
