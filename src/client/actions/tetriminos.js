import Api from '../mock/Api'

export const TETRIMINOS_MOVE_LEFT = 'tetriminos/TETRIMINOS_MOVE_LEFT'
export const TETRIMINOS_MOVE_RIGHT = 'tetriminos/TETRIMINOS_MOVE_RIGHT'
export const TETRIMINOS_MOVE_DOWN = 'tetriminos/TETRIMINOS_MOVE_DOWN'
export const TETRIMINOS_MOVE_UP = 'tetriminos/TETRIMINOS_MOVE_UP'
export const UNKNOW_KEY = 'tetriminos/UNKNOW_KEY'
export const TETRIMINOS_TICK = 'tetriminos/TETRIMINOS_TICK'
export const RESET = 'tetriminos/RESET'
export const GAME_START = 'tetriminos/GAME_START'
export const GAME_PAUSE = 'tetriminos/GAME_PAUSE'
export const GAME_STOP = 'tetriminos/GAME_STOP'
export const GAME_ERROR = 'tetriminos/GAME_ERROR'



export const button = (e) => {
  console.log('DANS BUTTON===========================')
  switch (e.target.innerHTML){
    case'Start':
      return {
        type: GAME_PAUSE
      }
    case'Pause':
      return {
        type: GAME_START
      }
    case 'Stop':
      return {
        type: GAME_STOP
      }
    default:
      return {
        type: GAME_ERROR
      }
  }
}

export const move = (e) => {
  console.log('move', e.key)
  switch (e.key) {
   
    case "ArrowLeft":
    console.log('left')
      return {
        type: TETRIMINOS_MOVE_LEFT,
        payload:{
          test:'lala'
        }
      }
    case "ArrowDown":    
    console.log('down')
      return {
        type: TETRIMINOS_MOVE_DOWN
      }
    case "ArrowRight":
    console.log('right')
      return {
        type: TETRIMINOS_MOVE_RIGHT
      }
    case "ArrowUp":
    console.log('up')
      return {
        type: TETRIMINOS_MOVE_UP
      }
      default: {
        return {
          type: UNKNOW_KEY
        }
      }
  }
}

export const tetriminosTick = () =>{
  console.log('Dans tick')
  return{
    type: TETRIMINOS_TICK,
  }
}

export const reset = () =>{
  return{
    type: RESET,
  }
}
