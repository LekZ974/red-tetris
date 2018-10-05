import {
  TETRIMINOS_MOVE_DOWN, TETRIMINOS_MOVE_LEFT, TETRIMINOS_MOVE_RIGHT, TETRIMINOS_MOVE_UP,
  TETRIMINOS_TICK, RESET, GAME_ERROR, GAME_PAUSE, GAME_START, GAME_STOP, TETRIMINOS_COLLISION
} from '../actions/tetriminos'
import {windowTick} from "../components/Room/PlayGround";


const playGroundArray =
  [
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,1,1,1,1,1,1,1,1,1,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,]
  ]
const piece = [0,0,0]
const initialState = {
  tetriminosPosX: 5,
  tetriminosPosY: 0,
  rot: 0,
  pieces:[
    [
      [1, 1],
      [1, 1]
    ],
    [
        [2, 0],
        [2, 0],
        [2, 0],
        [2, 0]
    ],
    [
        [3, 3, 3],
        [0, 3, 0],
        [0, 0, 0]
    ],
    [
        [4, 0],
        [4, 0],
        [4, 4]
    ],
    [
        [0, 5],
        [0, 5],
        [5, 5]
    ],
    [
        [6, 6, 0],
        [0, 6, 6]
    ],
    [
        [0, 7, 7],
        [7, 7, 0]
    ]
  ],
  test:'alpha',
  collision:false,
  prevPosX:null,
  prevPosY:null,
  start: false,
  stop: false,
  playground:playGroundArray,
}

const resetState = {
  tetriminosPosX: 5,
  tetriminosPosY: 0,
  collision:false,
  prevPosX:null,
  prevPosY:null,
  rot: 0,
  playground:playGroundArray,

}

export default function TetriminosReducer(state = initialState, action = {}) {
  const newState = Object.assign({}, state)
  newState.prevPosX = newState.tetriminosPosX
  newState.prevPosY = newState.tetriminosPosY
  switch (action.type) {
  case TETRIMINOS_TICK:{
  //if(newState.start === true){
       newState.tetriminosPosY = newState.tetriminosPosY + 1
  //   }  
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_DOWN: {
    // console.log(action)
    if(newState.collision === false) {

      newState.tetriminosPosY = newState.tetriminosPosY < 20 ?  newState.tetriminosPosY + 1 : newState.tetriminosPosY
      }
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_LEFT: {
    // console.log(action)
   if(newState.collision === false) {
    newState.tetriminosPosX = newState.tetriminosPosX >  0 ? newState.tetriminosPosX - 1 : newState.tetriminosPosX
   }
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_RIGHT: {
   if(newState.collision === false) {
      //newState.tetriminosPosX = newState.tetriminosPosX + 1
      console.log('PosX',  newState.tetriminosPosX )
      newState.tetriminosPosX = newState.tetriminosPosX < 10 ?  newState.tetriminosPosX + 1 : newState.tetriminosPosX
      console.log('PosX',  newState.tetriminosPosX )

   }
    return {
      ...newState,
      payload: action,
    }
  }
    case RESET:{
     const newResetState = resetState
      return {
        ...newResetState,
        payload: action,
      }
    }
  case TETRIMINOS_MOVE_UP: {
    if(newState.start === true) {
      switch (newState.rot) {
        case 0:
          newState.rot = 90
          break
        case 90:
          newState.rot = 180
          break
        case 180:
          newState.rot = 360
          break
        case 360:
          newState.rot = 0
          break
        default:
          newState.rot = 0
          break
      }
    }
      return {
        ...newState,
        payload: action,
      }
    }
  case GAME_START: {
    newState.start = false
    console.log('newsState playground', newState)
    return {
      ...newState,
      payload: action,
    }

    }
  case GAME_PAUSE: {
    newState.start = true
    console.log('newsState playground pause', newState)
    return {
      ...newState,
      payload: action,
    }
    }
  case GAME_STOP: {
    newState.stop = true
    return {
      ...newState,
      payload: action,
    }

  }
  case TETRIMINOS_COLLISION: {
    newState.isCollision = action.payload
    return {
      ...newState,
      payload: action,
    }

  }
  default:
    return state
  }
}

