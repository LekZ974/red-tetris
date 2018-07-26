import Api from '../mock/Api'

export const TETRIMINOS_MOVE_LEFT = 'tetriminos/TETRIMINOS_MOVE_LEFT'
export const TETRIMINOS_MOVE_RIGHT = 'tetriminos/TETRIMINOS_MOVE_RIGHT'
export const TETRIMINOS_MOVE_DOWN = 'tetriminos/TETRIMINOS_MOVE_DOWN'
export const TETRIMINOS_MOVE_UP = 'tetriminos/TETRIMINOS_MOVE_UP'
export const UNKNOW_KEY = 'tetriminos/UNKNOW_KEY'
export const TETRIMINOS_TICK = 'tetriminos/TETRIMINOS_TICK'

export const move = (e) => {
  switch (e.key) {
    default: {
      return {
        type: UNKNOW_KEY
      }
    }
    case "ArrowLeft":
      return {
        type: TETRIMINOS_MOVE_LEFT,
        payload:{
          test:'lala'
        }
      }
    case "ArrowDown":
      return {
        type: TETRIMINOS_MOVE_DOWN
      }
    case "ArrowRight":
      return {
        type: TETRIMINOS_MOVE_RIGHT
      }
    case "ArrowUp":
      return {
        type: TETRIMINOS_MOVE_UP
      }
  }
}

export const tetriminosTick = () =>{
  console.log('Dans tick')
  return{
    type: TETRIMINOS_TICK,
  }
}
